import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../infrastructure/app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/infrastructure/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { PickupDestinationFormComponent } from './pickup-destination-form/pickup-destination-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    PickupDestinationFormComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    GooglePlaceModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
