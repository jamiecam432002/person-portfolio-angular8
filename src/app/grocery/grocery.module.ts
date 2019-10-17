import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { GroceryRoutingModule } from './grocery-routing.module';
import { GroceryDashboardComponent } from './grocery-dashboard/grocery-dashboard.component';
import { GroceryDetailComponent } from './grocery-detail/grocery-detail.component';
import { GroceryMasterListComponent } from './grocery-master-list/grocery-master-list.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';


@NgModule({
  declarations: [GroceryDashboardComponent, GroceryDetailComponent, GroceryMasterListComponent, GroceryListComponent],
  imports: [
    CommonModule,
    GroceryRoutingModule,
    SharedModule
  ]
})
export class GroceryModule { }
