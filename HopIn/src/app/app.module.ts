import { AuthService } from './services/auth.service';
import { SocketService } from './services/socket.service';
import { NgModule, OnInit } from '@angular/core';
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
import { DocumentAddUpdateDialogComponent } from './document-add-update-dialog/document-add-update-dialog.component';
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
import { TokenInterceptor } from './interceptor/TokenInterceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InviteFriendsFormComponent } from './invite-friends-form/invite-friends-form.component';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { RouteSuggestionDetailsComponent } from './route-suggestion-details/route-suggestion-details.component';
import { OrderRideNotregisteredComponent } from './order-ride-notregistered/order-ride-notregistered.component';
import { AdminReportsComponent } from './admin-reports/admin-reports.component';
import { RideHistoryComponent } from './ride-history/ride-history.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RideInfoCardComponent } from './ride-info-card/ride-info-card.component';
import { RideHistoryDetailsComponent } from './ride-history-details/ride-history-details.component';
import { DriverInfoCardComponent } from './driver-info-card/driver-info-card.component';
import { PassengersInfoCardComponent } from './passengers-info-card/passengers-info-card.component';
import { RatingsCardComponent, ReviewDialog } from './ratings-card/ratings-card.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { BlockUserDetailsComponent } from './block-user-details/block-user-details.component';
import { UsersDashboardComponent } from './users-dashboard/users-dashboard.component';
import { NotesDisplayComponent } from './notes-display/notes-display.component';
import { AddNoteDialogComponent } from './add-note-dialog/add-note-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { CurrentRideComponent } from './current-ride/current-ride.component';
import { CdTimerModule } from 'angular-cd-timer';
import { ReejctionReasonDialogComponent } from './rejection-reason-dialog/rejection-reason-dialog.component';
import { PanicReasonDialogComponent } from './panic-reason-dialog/panic-reason-dialog.component';

import { RideReviewComponent } from './ride-review/ride-review.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { VehicleArrivedDialogComponent } from './vehicle-arrived-dialog/vehicle-arrived-dialog.component';

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
    DocumentAddUpdateDialogComponent,
    DriverAccountComponent,
    AdminAccountComponent,
    AdminRequestDetailsContainerComponent,
    DeclineRequestReasonDialogComponent,
    UpdateRequestsDisplayComponent,
    DriverRegisterPersonalInfoComponent,
    DriverRegisterComponent,
    RegistrationVerificationComponent,
    VehiclePreferencesFormComponent,
    InviteFriendsFormComponent,
    InviteDialogComponent,
    RouteSuggestionDetailsComponent,
    OrderRideNotregisteredComponent,
    AdminReportsComponent,
    RideHistoryComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RideInfoCardComponent,
    RideHistoryDetailsComponent,
    DriverInfoCardComponent,
    PassengersInfoCardComponent,
    RatingsCardComponent,
    ReviewDialog,
    UsersDisplayComponent,
    BlockUserDetailsComponent,
    UsersDashboardComponent,
    NotesDisplayComponent,
    AddNoteDialogComponent,
    ReejctionReasonDialogComponent,
    LoadingDialogComponent,
    CurrentRideComponent,
    PanicReasonDialogComponent,
    RideReviewComponent,
    AdminHomeComponent,
    VehicleArrivedDialogComponent
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
    CommonModule,
    CdTimerModule,
    NgxStarRatingModule,
    
    
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}, SocketService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  },],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private socketService: SocketService, private authService: AuthService) {
    this.authService.getUser().subscribe((user) => {
      this.socketService.closeWebSocketConnection();
      if (user != null) {
        this.socketService.openWebSocketConnection();
      }
    });
  }
}
