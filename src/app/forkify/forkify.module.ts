import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { ForkifyRoutingModule } from './forkify-routing.module';
import { LikesComponent } from './likes/likes.component';
import { ListComponent } from './list/list.component';
import { RecipeComponent } from './recipe/recipe.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';
import { DisclaimerComponent } from './dialogs/disclaimer/disclaimer.component';


@NgModule({
  declarations: [LikesComponent, ListComponent, RecipeComponent, SearchComponent, HomeComponent, DisclaimerComponent],
  imports: [
    CommonModule,
    ForkifyRoutingModule,
    SharedModule
  ],
  entryComponents: [DisclaimerComponent]
})
export class ForkifyModule { }
