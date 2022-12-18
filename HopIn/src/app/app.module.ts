import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
import { PassengerAccountOptionsComponent } from './passenger-account-options/passenger-account-options.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePaymentInfoComponent } from './change-payment-info/change-payment-info.component';
import { SnackBarComponent } from './shared/snack-bar/snack-bar.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FavouriteRoutesComponent } from './favourite-routes/favourite-routes.component';
import { AccountComponent } from './account/account.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatSnackBarModule} from '@angular/material/snack-bar'

import { PickupDestinationFormComponent } from './pickup-destination-form/pickup-destination-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker'
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { MapComponent } from './map/map.component';
import { OrderRideComponent } from './order-ride/order-ride.component';
import { RouteSuggestionComponent } from './route-suggestion/route-suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    PassengerAccountOptionsComponent,
    AccountSettingsComponent,
    ChangePasswordComponent,
    ChangePaymentInfoComponent,
    SnackBarComponent,
    AccountDetailsComponent,
    FavouriteRoutesComponent,
    AccountComponent,
    UserGraphComponent,
    PickupDestinationFormComponent,
    MapComponent,
    OrderRideComponent,
    RouteSuggestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot(),
    HttpClientModule, MatSnackBarModule,
    NgxMaterialTimepickerModule,
    GooglePlaceModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
