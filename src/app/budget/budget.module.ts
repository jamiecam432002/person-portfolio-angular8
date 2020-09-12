import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { BudgetRoutingModule } from './budget-routing.module';
import { BudgetDashboardComponent } from './budget-dashboard/budget-dashboard.component';
import { BudgetListComponent } from './budget-list/budget-list.component';
import { BudgetDetailComponent } from './budget-detail/budget-detail.component';

// the angular calendar imports
import { CalendarModule, DateAdapter, CalendarDateFormatter, CalendarMomentDateFormatter, MOMENT } from 'angular-calendar';
import moment from 'moment-timezone';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import { CalendarComponent } from './calendar/calendar.component';
import { BudgetSummaryComponent } from './budget-dashboard/budget-summary/budget-summary.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}


@NgModule({
  declarations: [BudgetDashboardComponent, BudgetListComponent, BudgetDetailComponent, CalendarComponent, BudgetSummaryComponent],
  imports: [
    CommonModule,
    BudgetRoutingModule,
    SharedModule,
    CalendarModule.forRoot(
      {
        provide: DateAdapter,
        useFactory: momentAdapterFactory
      }, 
      {
        dateFormatter: {
          provide: CalendarDateFormatter,
          useClass: CalendarMomentDateFormatter
        }
      },
      
      )
    ],
      providers: [
        {
          provide: MOMENT,
          useValue: moment
        }
      ]
})
export class BudgetModule { }
