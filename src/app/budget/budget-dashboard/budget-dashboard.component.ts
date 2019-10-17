import { Component, OnInit, OnChanges, AfterContentInit, AfterViewInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FItem } from './../fitem';
import { FItemService } from './../fitem.service';

@Component({
  selector: 'app-budget-dashboard',
  templateUrl: './budget-dashboard.component.html',
  styleUrls: ['./budget-dashboard.component.scss']
})
export class BudgetDashboardComponent implements OnInit {

  itemArray$: Observable<FItem[]>;
  // observables based on the income items
  incomeItems$: Observable<FItem[]>;
  incomeTotals: any;
  // observables based on the expense items
  expenseItems$: Observable<FItem[]>;
  expenseTotals: any;
  // observables based on the investment items
  investmentItems$: Observable<FItem[]>;
  investmentTotals: any;
  investmentTotal: number;
  // observables based on the debt items
  debtItems$: Observable<FItem[]>;
  debtTotals: any;
  // observables based on the savings items
  savingsItems$: Observable<FItem[]>;
  savingsTotals: any;

  // observable to track the overall state of the budget
  cashflowTotal: number;



  displayedColumns: string[] = ['title', 'amount'];

  constructor(private itemService: FItemService) { 
    
  }

  ngOnInit() {
    this.itemArray$ = this.itemService.getItems();

    // pipe the item array into a new observable of incomes only, convert those values into a single total in the subscribe function
    this.incomeItems$ = this.itemArray$
    .pipe(
      map(items => items.filter(item => item.type == 'Income'))
    )
    this.incomeItems$.subscribe(
      incomeitems => {
        this.incomeTotals = incomeitems.map(item => item["amount"]).reduce((prev, cur, index) => prev + cur, 0);
      }
    )

    // pipe the item array into a new observable of expenses only, convert those values into a single total in the subscribe function
    this.expenseItems$ = this.itemArray$
    .pipe(
      map(items => items.filter(item => item.type == 'Expense'))
    )
    this.expenseItems$.subscribe(
      expenseitems => {
        this.expenseTotals = expenseitems.map(item => item["amount"]).reduce((prev, cur, index) => prev + cur, 0);
      }
    )

    // pipe the item array into a new observable of investments only, convert those values into a single total in the subscribe function
    this.investmentItems$ = this.itemArray$
    .pipe(
      map(items => items.filter(item => item.type == 'Investment'))
    )
    this.investmentItems$.subscribe(
      investmentitems => {
        this.investmentTotals = investmentitems.map(item => item["assetValue"]).reduce((prev, cur, index) => prev + cur, 0);
      }
    )

    // pipe the item array into a new observable of debts only, convert those values into a single total in the subscribe function
    this.debtItems$ = this.itemArray$
    .pipe(
      map(items => items.filter(item => item.type == 'Debt'))
    )
    this.debtItems$.subscribe(
      debtitems => {
        this.debtTotals = debtitems.map(item => item["owing"]).reduce((prev, cur, index) => prev + cur, 0);
      }
    )

    // pipe the item array into a new observable of savings only, convert those values into a single total in the subscribe function
    this.savingsItems$ = this.itemArray$
    .pipe(
      map(items => items.filter(item => item.type == 'Savings'))
    )
    this.savingsItems$.subscribe(
      savingsitems => {
        this.savingsTotals = savingsitems.map(item => item["amount"]).reduce((prev, cur, index) => prev + cur, 0);
        this.cashflowTotal = this.incomeTotals - (this.expenseTotals + this.savingsTotals);
      }
    )

    
  };



  deleteRecord(item: FItem) {
    this.itemService.deleteItem(item);
  }
  

}
