import { Component, ChangeDetectionStrategy, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { isSameDay, isSameMonth } from 'date-fns';
import { CalendarEvent, CalendarEventTitleFormatter, CalendarView, CalendarMonthViewBeforeRenderEvent, CalendarDateFormatter } from 'angular-calendar';
import { FItemService } from '../fitem.service';
import { FItem } from '../fitem';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import RRule from 'rrule';
import moment from 'moment-timezone';
import { CustomEventTitleFormatter } from './custom-event-title-formatter.provider';
import { CustomDateFormatter } from './custom-date-formatter.provider';
import { ViewPeriod } from 'calendar-utils';
import { BreakpointObserver } from '@angular/cdk/layout';

moment.tz.setDefault("America/New_York");


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: CalendarEventTitleFormatter, useClass: CustomEventTitleFormatter
    },
     {
       provide: CalendarDateFormatter, useClass: CustomDateFormatter
     }
  ]
})
export class CalendarComponent {

  

  isSmallScreen: boolean = false;

  view: CalendarView = CalendarView.Month;
  viewDate = moment().toDate();

  filteredEventArray: FItem[] = [];
  calendarEvents: FItem[] = [];
  viewPeriod: ViewPeriod;
  activeDayIsOpen: boolean = true;

  dbEvents$: Observable<FItem[]> = null;
  filteredEvents$: Observable<any>;

  constructor(private fItemService: FItemService, private cdr: ChangeDetectorRef, private breakpointObserver: BreakpointObserver) { }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log(date);
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }
  
  checkScreen() {
    console.log("checking screen")
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 1068px)');
  }
  updateCalendarEvents(
    viewRender:
      | CalendarMonthViewBeforeRenderEvent
  ): void {
    if (
      !this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.calendarEvents = [];

      console.log(this.filteredEventArray.length);

      this.filteredEventArray.forEach(event => {
      
        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(event.start)
            .startOf('day')
            .toDate(),
          until: moment(viewRender.period.end)
            .endOf('day')
            .toDate()
        });
        const { title, amount, cssClass } = event;

        rule.all().forEach(date => {
          this.calendarEvents.push({
            title,
            amount,
            cssClass,
            start: moment(date).toDate()
          });
        });
      });
      this.cdr.detectChanges();
    }
  }

  
  ngOnInit() {
    this.checkScreen();
    this.calendarEvents = [];
    this.loadEvents();
  }

  loadEvents(): void {
    this.dbEvents$ = this.fItemService.getItems();

    // create a new observable that eliminates the debt and investment records because they do not have a start date and do not required display on the calendar

    this.filteredEvents$ = this.dbEvents$.pipe(
      map(data => {
        return data.filter(item => {
          let cssClass;
          if (item.type == "Income") {
            item.cssClass = "income-event"
          } else if (item.type == "Expense") {
            item.cssClass = "expense-event"
          } else if (item.type == "Saving") {
            item.cssClass = "savings-event"
          }
          return Object.keys(item).includes('start')
        });
      })
    );
    this.filteredEvents$.subscribe(
      data => { this.filteredEventArray = data;},
      err => console.log(err),
      () => console.log("completed")
    );
  }

}

