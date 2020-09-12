import { LOCALE_ID, Inject } from '@angular/core';
import { CalendarEventTitleFormatter, CalendarEvent } from 'angular-calendar';
import { DatePipe, formatCurrency } from '@angular/common';
import { FItem } from '../fitem';

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
    constructor(@Inject(LOCALE_ID) private locale: string) {
        super();
    }

    // you can override any of the methods defined in the parent class

    month(event: any): string {
        return `${event.title} - ${formatCurrency(event.amount, this.locale, '$')}`;
    }
    monthTooltip(event: any): string {
        return `${event.title} - ${formatCurrency(event.amount, this.locale, '$')}`;
    }
    week(event: any): string {
        return `<b>${new DatePipe(this.locale).transform(
            event.start,
            'h:m a',
            this.locale
        )}</b> ${event.title}`;
    }

    day(event: any): string {
        return `<b>${new DatePipe(this.locale).transform(
            event.start,
            'h:m a',
            this.locale
        )}</b> ${event.title}`;
    }
}