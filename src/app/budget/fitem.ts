import { Timestamp } from 'rxjs/internal/operators/timestamp';

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
         initialDate?: Date,
         nextDate?: Date
}