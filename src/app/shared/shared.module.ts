import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import all the material modules from material.module
import { MaterialModule } from './material.module';
// import the angular fire library 
import { FirebaseModule } from './firebase.module'; 

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPaginationModule } from 'ngx-pagination';
import { TruncatePipe } from './truncate.pipe';


@NgModule({
  declarations: [TruncatePipe],
  imports: [
    CommonModule,
    MaterialModule,
    AngularSvgIconModule,
    FirebaseModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule
  ],
  exports: [
    MaterialModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgxPaginationModule,
    TruncatePipe
  ],
})
export class SharedModule { 
  constructor() {
    
  }
}
