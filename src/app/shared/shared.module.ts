import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import all the material modules from material.module
import { MaterialModule } from './material.module';
// import the angular fire library 
import { FirebaseModule } from './firebase.module'; 

import { AngularSvgIconModule } from 'angular-svg-icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    AngularSvgIconModule,
    FirebaseModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    AngularSvgIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class SharedModule { 
  constructor() {
    
  }
}
