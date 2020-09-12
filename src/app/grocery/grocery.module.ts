import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../shared/shared.module';

import { GroceryRoutingModule } from './grocery-routing.module';
import { GdashboardComponent } from './gdashboard/gdashboard.component';
import { GlistComponent } from './gdashboard/glist/glist.component';
import { GmlistComponent } from './gdashboard/gmlist/gmlist.component';
import { GeditMasterComponent } from './gdialogs/gedit-master/gedit-master.component';
import { GaddFromMasterComponent } from './gdialogs/gadd-from-master/gadd-from-master.component';
import { GcategoriesComponent } from './gcategories/gcategories.component';
import { GeditCategoriesComponent } from './gdialogs/gedit-categories/gedit-categories.component';
import { GeditMasterItemComponent } from './gdialogs/gedit-master-item/gedit-master-item.component';
import { GeditListItemComponent } from './gdialogs/gedit-list-item/gedit-list-item.component';

import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';


@NgModule({
  declarations: [GdashboardComponent, GeditMasterComponent, GlistComponent, GmlistComponent, GaddFromMasterComponent, GcategoriesComponent, GeditCategoriesComponent, GeditMasterItemComponent, GeditListItemComponent],
  imports: [
    CommonModule,
    GroceryRoutingModule,
    SharedModule
  ],
  entryComponents: [GaddFromMasterComponent, GeditMasterComponent, GeditCategoriesComponent, GeditMasterItemComponent, GeditListItemComponent]
})
export class GroceryModule { 
  constructor(private matIconReg: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconReg.addSvgIcon(
      'Grains',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/001-bread.svg")
    );
    this.matIconReg.addSvgIcon(
      'Fruits',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/002-watermelon.svg")
    );
    this.matIconReg.addSvgIcon(
      'Vegetables',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/041-carrot.svg")
    );
    this.matIconReg.addSvgIcon(
      'Beverages',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/004-drinks.svg")
    );
    this.matIconReg.addSvgIcon(
      'Meat',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/024-meat.svg")
    );
    this.matIconReg.addSvgIcon(
      'Snacks',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/037-cookie.svg")
    );
    this.matIconReg.addSvgIcon(
      'Dairy',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/011-milk-products.svg")
    );
    this.matIconReg.addSvgIcon(
      'Breakfast Cereals',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/cereal.svg")
    );
    this.matIconReg.addSvgIcon(
      'Pasta',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/020-pasta.svg")
    );
    this.matIconReg.addSvgIcon(
      'Fish',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/015-fish.svg")
    );
    this.matIconReg.addSvgIcon(
      'Baking',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/flour.svg")
    );
    this.matIconReg.addSvgIcon(
      'Household Items',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/023-detergent.svg")
    );
    this.matIconReg.addSvgIcon(
      'Canned Items',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/042-canned-food.svg")
    );
    this.matIconReg.addSvgIcon(
      'Condiments',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/026-tomato-sauce.svg")
    );
    this.matIconReg.addSvgIcon(
      'Pets',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/025-pet-food.svg")
    );
    this.matIconReg.addSvgIcon(
      'Seasonings',
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/grocery/svg/011-seasonings.svg")
    );
  }
}
