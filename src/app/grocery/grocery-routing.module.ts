import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GdashboardComponent } from './gdashboard/gdashboard.component';
import { GmlistComponent } from './gdashboard/gmlist/gmlist.component';
import { GcategoriesComponent } from './gcategories/gcategories.component';


const routes: Routes = [
  { path: '', component: GdashboardComponent },
  { path: 'master-list', component: GmlistComponent },
  { path: 'categories', component: GcategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroceryRoutingModule { }
