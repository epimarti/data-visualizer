import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppComponent } from './app.component';
import { AuthService} from './services/auth.service';
import { DataService} from './services/data.service';
import { DataRatePipe } from './pipes/data-rate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DataRatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxChartsModule
  ],
  providers: [ AuthService, DataService, DataRatePipe, JsonPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
