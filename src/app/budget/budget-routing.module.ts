import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';



const routes: Routes = [
  { path: '', component: BudgetDashboardComponent},
  { path: 'incomes', component: BudgetListComponent },
  { path: 'expenses', component: BudgetListComponent },
  { path: 'investments', component: BudgetListComponent },
  { path: 'debts', component: BudgetListComponent },
  { path: 'savings', component: BudgetListComponent },
  { path: 'add-edit-record', component: BudgetDetailComponent },
  { path: 'add-edit-record/:id', component: BudgetDetailComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudgetRoutingModule { }
