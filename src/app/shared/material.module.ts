import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatListModule,
        DragDropModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
    ],
    exports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatToolbarModule,
        MatListModule,
        DragDropModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule, 
    ]
})

export class MaterialModule {
    constructor() {
        
    }
}