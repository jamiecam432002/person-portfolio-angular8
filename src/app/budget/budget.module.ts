import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';



@NgModule({
  declarations: [BudgetDashboardComponent, BudgetListComponent, BudgetDetailComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    SharedModule,

  ]
})
export class BudgetModule { }
