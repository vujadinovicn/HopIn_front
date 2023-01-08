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
import { AccountOptionsComponent } from './account-options/account-options.component';
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
import { VehiclesMapComponent } from './vehicles-map/vehicles-map.component';
import { DriverAccountComponent } from './driver-account/driver-account.component';
import { CommonModule } from '@angular/common';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { ChangeVehicleInfoComponent } from './change-vehicle-info/change-vehicle-info.component';
import { DriverDocumentsComponent } from './driver-documents/driver-documents.component';
import { DocumentDetailsDialogComponent } from './document-details-dialog/document-details-dialog.component';
import { DocumentUpdateDialogComponent } from './document-update-dialog/document-update-dialog.component';
import { DocumentAddDialogComponent } from './document-add-dialog/document-add-dialog.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { RequestFeedbackComponent } from './request-feedback/request-feedback.component';
import { DriverRequestDashboardComponent } from './driver-request-dashboard/driver-request-dashboard.component';
import { UpdateRequestDetailsComponent } from './update-request-details/update-request-details.component';
import { AdminRequestDetailsContainerComponent } from './admin-request-details-container/admin-request-details-container.component';
import { DeclineRequestReasonDialogComponent } from './decline-request-reason-dialog/decline-request-reason-dialog.component';
import { UpdateRequestsDisplayComponent } from './update-requests-display/update-requests-display.component';
import { DriverRegisterPersonalInfoComponent } from './driver-register-personal-info/driver-register-personal-info.component';
import { DriverRegisterComponent } from './driver-register/driver-register.component';
import { RegistrationVerificationComponent } from './registration-verification/registration-verification.component';
import { VehiclePreferencesFormComponent } from './vehicle-preferences-form/vehicle-preferences-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    AccountOptionsComponent,
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
    RouteSuggestionComponent,
    VehiclesMapComponent,
    AccountUpdateComponent,
    ChangeVehicleInfoComponent,
    DriverDocumentsComponent,
    DocumentDetailsDialogComponent,
    DriverAccountComponent,
    AdminAccountComponent,
    RequestFeedbackComponent,
    DriverRequestDashboardComponent,
    UpdateRequestDetailsComponent,
    DocumentUpdateDialogComponent,
    DocumentAddDialogComponent,
    DriverAccountComponent,
    AdminAccountComponent,
    AdminRequestDetailsContainerComponent,
    DeclineRequestReasonDialogComponent,
    UpdateRequestsDisplayComponent,
    DriverRegisterPersonalInfoComponent,
    DriverRegisterComponent,
    RegistrationVerificationComponent,
    VehiclePreferencesFormComponent
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
    GooglePlaceModule,
    CommonModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
