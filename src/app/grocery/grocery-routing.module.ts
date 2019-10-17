import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroceryDashboardComponent } from './grocery-dashboard/grocery-dashboard.component';
import { GroceryDetailComponent } from './grocery-detail/grocery-detail.component';
import { GroceryListComponent } from './grocery-list/grocery-list.component';
import { GroceryMasterListComponent } from './grocery-master-list/grocery-master-list.component';


const routes: Routes = [
  { path: 'grocery-dashboard', component: GroceryDashboardComponent },
  { path: 'list-detail:id', component: GroceryDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
