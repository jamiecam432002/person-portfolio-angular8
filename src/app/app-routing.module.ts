import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './portfolioapp/home/home.component';
import { PortfolioComponent } from './portfolioapp/portfolio/portfolio.component';
import { ExtrasComponent } from './portfolioapp/extras/extras.component';
import { ContactComponent } from './portfolioapp/contact/contact.component';
import { AngularProjectsComponent } from './portfolioapp/angular-projects/angular-projects.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'extras', component: ExtrasComponent },
  { path: 'contact-me', component: ContactComponent },
  { path: 'angular-projects', component: AngularProjectsComponent },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
  },
  {
    path: 'grocery',
    loadChildren: () => import('./grocery/grocery.module').then(m => m.GroceryModule)
  },
  {
    path: 'forkify',
    loadChildren: () => import('./forkify/forkify.module').then(m => m.ForkifyModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
