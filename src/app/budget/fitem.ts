import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { CalendarEventAction } from 'angular-calendar';

export interface FItem {
         title?: string,
         method?: string,
         id?: string,
         amount?: number,
         assetValue?: number,
         owing?: number,
         frequency?: string,
         notes?: string,
         type?: string,
         start?: any,
         initialDate?: Date,
         nextDate?: Date,
         actions?: any,
         cssClass?: string,
         rrule?: {
             freq: any;
             bymonth?: number;
             bymonthday?: number;
             byweekday?: any;
             interval?: number;
             dtstart?: Date
         }
}