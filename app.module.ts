import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomersService } from './app.service';
import { DateFormatter } from './date-formatter';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [CustomersService, HttpModule, DateFormatter],
  bootstrap: [AppComponent]
})
export class AppModule { }
