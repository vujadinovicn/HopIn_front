import { BlockUserDetailsComponent } from './../app/block-user-details/block-user-details.component';
import { UsersDisplayComponent } from './../app/users-display/users-display.component';
import { RideHistoryDetailsComponent } from './../app/ride-history-details/ride-history-details.component';
import { RideHistoryComponent } from './../app/ride-history/ride-history.component';
import { ResetPasswordComponent } from './../app/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './../app/forgot-password/forgot-password.component';
import { FormControl } from '@angular/forms';
import { AdminReportsComponent } from './../app/admin-reports/admin-reports.component';
import { OrderRideNotregisteredComponent } from './../app/order-ride-notregistered/order-ride-notregistered.component';
import { InviteFriendsFormComponent } from './../app/invite-friends-form/invite-friends-form.component';
import { RegistrationVerificationComponent } from './../app/registration-verification/registration-verification.component';
import { DriverRequestDashboardComponent } from './../app/driver-request-dashboard/driver-request-dashboard.component';
import { RouteSuggestionComponent } from './../app/route-suggestion/route-suggestion.component';
import { OrderRideComponent } from './../app/order-ride/order-ride.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from 'src/app/landing/landing.component';
import { LoginComponent } from 'src/app/login/login.component';
import { RegisterComponent } from 'src/app/register/register.component';
import { AccountSettingsComponent } from 'src/app/account-settings/account-settings.component';
import { ChangePasswordComponent } from 'src/app/change-password/change-password.component';
import { ChangePaymentInfoComponent } from 'src/app/change-payment-info/change-payment-info.component';
import { AccountComponent } from 'src/app/account/account.component';
import { DriverAccountComponent } from 'src/app/driver-account/driver-account.component';
import { AccountUpdateComponent } from 'src/app/account-update/account-update.component';
import { AdminAccountComponent } from 'src/app/admin-account/admin-account.component';
import { AdminRequestDetailsContainerComponent } from 'src/app/admin-request-details-container/admin-request-details-container.component';
import { DriverRegisterPersonalInfoComponent } from 'src/app/driver-register-personal-info/driver-register-personal-info.component';
import { DriverRegisterComponent } from 'src/app/driver-register/driver-register.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify', component: RegistrationVerificationComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'order-ride', component: OrderRideComponent},
  {path: 'order-ride-unreg', component: OrderRideNotregisteredComponent},
  {path: 'route-suggestion', component: RouteSuggestionComponent},
  {path: 'request-dashboard', component: DriverRequestDashboardComponent},
  {path: 'account-driver', component: DriverAccountComponent},
  {path: 'account-passenger', component: AccountComponent},
  {path: 'account-admin', component: AdminAccountComponent},
  {path: 'users-dashboard', component: BlockUserDetailsComponent},
  {path: 'admin-reports', component: AdminReportsComponent},
  {path: 'ride-history', component: RideHistoryComponent},
  {path: 'ride-history-details', component: RideHistoryDetailsComponent},
  {path: 'account-settings', component: AccountUpdateComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path:'change-payment-info', component: ChangePaymentInfoComponent},
  {path:'forgot-password', component: ForgotPasswordComponent},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
