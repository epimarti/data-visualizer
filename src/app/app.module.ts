import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts'

import { AppComponent } from './app.component';
import { AuthService} from './services/auth.service';
import { DataService} from './services/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [ AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
