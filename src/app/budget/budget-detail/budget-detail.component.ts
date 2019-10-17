import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FItemService } from './../fitem.service';
import { FItem } from '../fitem';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss']
})
export class BudgetDetailComponent implements OnInit {

  item: Observable<any>;

  frequencies = ['Weekly', 'Biweekly', 'Monthly', 'Annually', 'Anal'];
  types = ['Income', 'Expense', 'Investment', 'Debt', 'Savings'];
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
  initialDate = new FormControl('', [Validators.required]);
  nextDate = new FormControl('', [Validators.required]);


  // the properties on model are used to set defaults in the select of the form
  model: FItem = <FItem>{
    type: "Income",
    frequency: "Weekly",
    method: "Automatic Deduction"
  };
  submitted = false;
  newRecord: Boolean = true;
  docId: string;
  

  constructor(private itemService: FItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.budgetForm = new FormGroup({
      title: this.title,
      amount: this.amount,
      assetValue: this.assetValue,
      rate: this.rate,
      owing: this.owing,
      notes: this.notes,
      type: this.type,
      frequency: this.frequency,
      method: this.method,
      initialDate: this.initialDate,
      nextDate: this.nextDate
    });


    this.activatedRoute.paramMap.subscribe(params => {
      if(params.has('id')){
        this.docId = params.get('id');
        this.newRecord = false;
        this.item = this.itemService.getItem(this.docId);
        this.item.subscribe(data => {
          this.title.setValue(data.title);
          this.amount.setValue(data.amount);
          this.assetValue.setValue(data.assetValue);
          this.rate.setValue(data.rate);
          this.owing.setValue(data.owing);
          this.notes.setValue(data.notes);
          this.type.setValue(data.type);
          this.frequency.setValue(data.frequency);
          this.method.setValue(data.method);
          this.initialDate.setValue(data.initialDate.toDate());
          this.nextDate.setValue(data.nextDate.toDate());

        })
      }
      
    })


    /*if(this.activatedRoute.params._value.id){
      this.newRecord = false;
      this.docId = this.activatedRoute.params._value.id;
      this.item = this.itemService.getItem(this.docId);
      this.item.subscribe(data => {
        
        this.model = data;
        this.model.initialDate = data.initialDate.toDate();
        this.model.nextDate = data.nextDate.toDate();
      });
    }*/
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.budgetForm.controls[controlName].hasError(errorName);
  }
  onSubmit(formValues) {
    console.log(this.budgetForm.value);

    // gather up the form values including the ones that are optional based on type
    let newDoc = this.budgetForm.value;

    /*if (this.budgetForm.value.type == 'Investment' || this.budgetForm.value.type == 'Debt') {
      delete newDoc.frequency;
      delete newDoc.method;
    }*/
    // get rid of any undefined values - will happen if field is not required
    Object.keys(newDoc).forEach(key => newDoc[key] === undefined ? delete newDoc[key] : '');
    //newDoc.initialDate = firebase.firestore.Timestamp.fromDate(newDoc.initialDate);
    //merge the form values with the model values from the selects
    //newDoc = { ...newDoc, ...this.model };
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

  cancelEdit() {
    this.router.navigate(['/budget']);
  }


  get diagnostic() {
    return JSON.stringify(this.model);
  }

}
