import { CurrentRideComponent } from './../app/current-ride/current-ride.component';
import { UsersDashboardComponent } from './../app/users-dashboard/users-dashboard.component';
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
import { HomeDriverComponent } from './../app/home-driver/home-driver.component';
import { HomeAdminComponent } from './../app/home-admin/home-admin.component';
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
import { RideReviewComponent } from 'src/app/ride-review/ride-review.component';
import { AdminHomeComponent } from 'src/app/admin-home/admin-home.component';
import { LoginGuard } from 'src/app/guards/login/login.guard';
import { PassengerGuard } from 'src/app/guards/passenger/passenger.guard';
import { DriverGuard } from 'src/app/guards/driver/driver.guard';
import { AdminGuard } from 'src/app/guards/admin/admin.guard';
import { PassengerDriverGuard } from 'src/app/guards/passenger-driver/passenger-driver.guard';
import { RegisteredUserGuard } from 'src/app/guards/registered-user/registered-user.guard';
import { CurrentRideGuard } from 'src/app/guards/current-ride/current-ride.guard';
import { RideHistoryDetailsGuard } from 'src/app/guards/ride-history-details/ride-history-details.guard';
import { ReminderDialogComponent } from 'src/app/reminder-dialog/reminder-dialog.component';

const routes: Routes = [
  {path: '', component: LandingComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
  {path: 'verify', component: RegistrationVerificationComponent, canActivate: [LoginGuard]},
  {path: 'order-ride', component: OrderRideComponent, canActivate: [PassengerGuard]},
  {path: 'order-ride-unreg', component: OrderRideNotregisteredComponent, canActivate: [LoginGuard]},
  {path: 'home-admin', component: HomeAdminComponent, canActivate: [AdminGuard]},
  {path: 'home-driver', component: HomeDriverComponent, canActivate: [DriverGuard]},
  {path: 'route-suggestion', component: RouteSuggestionComponent, canActivate: [LoginGuard]},
  {path: 'request-dashboard', component: DriverRequestDashboardComponent, canActivate: [AdminGuard]},
  {path: 'account-driver', component: DriverAccountComponent, canActivate: [DriverGuard]},
  {path: 'account-passenger', component: AccountComponent, canActivate: [PassengerGuard]},
  {path: 'account-admin', component: AdminAccountComponent, canActivate: [AdminGuard]},
  {path: 'users-dashboard', component: UsersDashboardComponent, canActivate: [AdminGuard]},
  {path: 'admin-reports', component: AdminReportsComponent, canActivate: [AdminGuard]},
  {path: 'admin-home', component: AdminHomeComponent, canActivate: [AdminGuard]},
  {path: 'ride-history', component: RideHistoryComponent, canActivate: [PassengerDriverGuard]},
  {path: 'ride-history-details', component: RideHistoryDetailsComponent, canActivate: [RideHistoryDetailsGuard]},
  {path: 'account-settings', component: AccountUpdateComponent, canActivate: [RegisteredUserGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [RegisteredUserGuard]},
  {path:'change-payment-info', component: ChangePaymentInfoComponent, canActivate: [PassengerGuard]},
  {path:'forgot-password', component: ForgotPasswordComponent, canActivate: [LoginGuard]},
  {path:'current-ride', component: CurrentRideComponent, canActivate: [CurrentRideGuard]},
  {path: '**', component: LandingComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
