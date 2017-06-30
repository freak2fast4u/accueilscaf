import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchCafComponent } from './search-caf/search-caf.component';
import { LocationService } from './service/location.service';

import { GeocafrestService } from './service/geocafrest.service';

import { AgmCoreModule } from '@agm/core';

import { SafeHtmlPipe } from "./safeHtml"

import { AppSettings } from "./appSettings"

@NgModule({
  declarations: [
    AppComponent,
    SearchCafComponent,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: AppSettings.GOOGLE_MAP_KEY
    })
  ],
  providers: [
    LocationService,
    GeocafrestService,
    { provide: "urlServiceRest", useValue: AppSettings.URL_REST_SERVER }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
