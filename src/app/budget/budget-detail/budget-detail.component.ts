import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FItemService } from './../fitem.service';
import { FItem } from '../fitem';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import RRule from 'rrule';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, getDay } from 'date-fns';
import moment from 'moment-timezone';

export interface Frequency {
  value: number;
  viewValue: string;
}

export interface Rule {
  freq: number;
  interval?: number;
  byweekday?: number;
  bymonthday?: number;
  byyearday?: number;
}

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit {

  item: Observable<any>;

  //frequencies = ['Weekly', 'Biweekly', 'Monthly', 'Annually', 'Anal'];
  frequencies: Frequency[] = [
    { value: 3, viewValue: 'Weekly' },
    { value: 2, viewValue: 'Biweekly'},
    { value: 1, viewValue: 'Monthly'},
    { value: 0, viewValue: 'Annually'}
  ]
  types = ['Income', 'Expense', 'Investment', 'Debt', 'Saving'];
  methods = ['Automatic Deduction', 'Automatic Deposit', 'Manual Bank Transfer'];
  
  budgetForm: FormGroup;
  title = new FormControl('');
  amount= new FormControl(0, [Validators.required]);
  assetValue = new FormControl(0, [Validators.required]);
  rate = new FormControl(0, [Validators.required]);
  owing = new FormControl(0, [Validators.required]);
  notes = new FormControl('');
  type = new FormControl('', [Validators.required]);
  frequency = new FormControl('', [Validators.required]);
  method = new FormControl('', [Validators.required]);
  start = new FormControl('',);

  submitted = false;
  newRecord: Boolean = true;
  docId: string;
  docType: string;
  

  constructor(private itemService: FItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
      // if the id parameter is not "new", then the record is being edited
      
      if(params.get('id') != "new"){
        this.docId = params.get('id');
        this.newRecord = false;
        this.item = this.itemService.getItem(this.docId);
        this.docType = params.get('type');
        console.log(this.docType + " is the document type");
        this.item.subscribe(data => {
          console.log(data);
          if (this.docType == "Income" || this.docType == "Expense" || this.docType == "Saving") {
            this.budgetForm = new FormGroup({
              type: new FormControl(this.docType, [Validators.required]),
              title: new FormControl(data.title),
              amount: new FormControl(data.amount, [Validators.required]),
              frequency: new FormControl(data.frequency, [Validators.required]),
              method: new FormControl(data.method, [Validators.required]),
              start: new FormControl(data.start.toDate()),
              notes: new FormControl(data.notes),
            });
          } else if (this.docType == "Debt") {
            this.budgetForm = new FormGroup({
              type: new FormControl(this.docType, [Validators.required]),
              title: new FormControl(data.title),
              owing: new FormControl(data.owing, [Validators.required]),
              rate: new FormControl(data.rate, [Validators.required]),
              notes: new FormControl(data.notes),
            });
          } else if (this.docType == "Investment") {
            this.budgetForm = new FormGroup({
              type: new FormControl(this.docType, [Validators.required]),
              title: new FormControl(data.title),
              assetValue: new FormControl(data.assetValue, [Validators.required]),
              notes: new FormControl(data.notes),
            });
          }

        })
      } else {
        this.docType = params.get('type');
        console.log(this.docType);

        if(this.docType == "Income" || this.docType == "Expense" || this.docType == "Saving") {
          this.budgetForm = new FormGroup({
            type: new FormControl(this.docType, [Validators.required]),
            title: new FormControl(''),
            amount: new FormControl(0, [Validators.required]),
            frequency: new FormControl('', [Validators.required]),
            method: new FormControl('', [Validators.required]),
            start: new FormControl(''),
            notes: new FormControl(''),
          });
        } else if(this.docType == "Debt") {
          this.budgetForm = new FormGroup({
            type: new FormControl(this.docType, [Validators.required]),
            title: new FormControl(''),
            owing: new FormControl(0, [Validators.required]),
            rate: new FormControl(0, [Validators.required]),
            notes: new FormControl(''),
          });
        } else if (this.docType == "Investment") {
          this.budgetForm = new FormGroup({
            type: new FormControl(this.docType, [Validators.required]),
            title: new FormControl(''),
            assetValue: new FormControl(0, [Validators.required]),
            notes: new FormControl(''),
          });
        }
        
      }
      
    })
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.budgetForm.controls[controlName].hasError(errorName);
  }
  onSubmit(event) {
    event.preventDefault();
    //console.log(this.budgetForm.value);

    // gather up the form values including the ones that are optional based on type
    let newDoc = this.budgetForm.value;
    let dayofweek = getDay(newDoc.start) - 1;

    if(dayofweek < 0) {
      dayofweek = 6;
    }

    if(newDoc.type == 'Income' || newDoc.type == 'Expense' || newDoc.type == 'Saving') {
      // create a new object to populate rrule on the database object but only for types income, expense and saving
      let rrule: Rule = {
        freq: newDoc.frequency,

      };

      // frequency is "weekly"
      if (newDoc.frequency == 3) {
        rrule.freq = 2;
        rrule.interval = 1;
        rrule.byweekday = dayofweek;
        newDoc.normalized = newDoc.amount * 52 / 12;

      } // frequency is "biweekly"
        else if (newDoc.frequency == 2) {
        rrule.interval = 2;
        rrule.byweekday = dayofweek;
        newDoc.normalized = newDoc.amount * 26 / 12;

      } // frequency is "annually"
        else if (newDoc.frequency == 1) {
        newDoc.normalized = newDoc.amount;

      }  // frequency is "annually"
        else if (newDoc.frequency == 0) {
        newDoc.normalized = newDoc.amount / 12;
      }
    
      newDoc.rrule = rrule;
    }
    console.log(newDoc);
    if(this.newRecord == true) {
      this.createNewRecord(newDoc);
    }else{
      this.updateRecord(newDoc);
    }

  }
  
  createNewRecord(budgetFormValue) {
      this.itemService.addItem(budgetFormValue);
      this.router.navigate(['/budget']);
  }

  updateRecord(budgetFormValue) {
    this.itemService.updateItem(this.docId, budgetFormValue);
    this.router.navigate(['/budget']);
  }

  deleteRecord() {
    this.itemService.deleteFromRecord(this.docId);
    this.router.navigate(['/budget']);
  }

  cancelEdit() {
    this.router.navigate(['/budget']);
  }

}
