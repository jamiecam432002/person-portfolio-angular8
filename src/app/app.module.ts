import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule} from './shared/shared.module';
import { FooModule } from './foo/foo.module';
import { ForkifyModule } from './forkify/forkify.module';
import { GroceryModule } from './grocery/grocery.module';
import { KawhiModule } from './kawhi/kawhi.module';


// components for main site
import { HomeComponent } from './portfolioapp/home/home.component';
import { ExtrasComponent } from './portfolioapp/extras/extras.component';
import { PortfolioComponent } from './portfolioapp/portfolio/portfolio.component';
import { ContactComponent } from './portfolioapp/contact/contact.component';
import { BjsChartComponent } from './portfolioapp/bjs-chart/bjs-chart.component';

// reusable header and footer including navigation
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExtrasComponent,
    PortfolioComponent,
    ContactComponent,
    BjsChartComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FooModule,
    ForkifyModule,
    GroceryModule,
    KawhiModule,
    SharedModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor() {}
}
