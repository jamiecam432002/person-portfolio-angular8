import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule, MatDatepickerModule, MatInputModule, MatSelectModule, MatSortModule, MatCheckboxModule, MatDialogModule } from '@angular/material';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LayoutModule } from '@angular/cdk/layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';


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
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatSortModule,
        MatCheckboxModule,
        MatDialogModule,
        LayoutModule,
        MatPaginatorModule,
        MatTooltipModule
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
        MatButtonToggleModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatSortModule,
        MatCheckboxModule,
        MatDialogModule,
        LayoutModule,
        MatPaginatorModule,
        MatTooltipModule
    ]
})

export class MaterialModule {
    constructor() {
        
    }
}