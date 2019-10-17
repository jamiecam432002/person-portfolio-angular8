import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './portfolioapp/home/home.component';
import { PortfolioComponent } from './portfolioapp/portfolio/portfolio.component';
import { ExtrasComponent } from './portfolioapp/extras/extras.component';
import { ContactComponent } from './portfolioapp/contact/contact.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'extras', component: ExtrasComponent },
  { path: 'contact-me', component: ContactComponent },
  {
    path: 'budget',
    loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule)
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { enableTracing: true}),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
