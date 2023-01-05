import { AdminReportsComponent } from './../app/admin-reports/admin-reports.component';
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

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verify', component: RegistrationVerificationComponent},
  {path: 'order-ride', component: OrderRideComponent},
  {path: 'route-suggestion', component: RouteSuggestionComponent},
  {path: 'request-dashboard', component: DriverRequestDashboardComponent},
  {path: 'account-driver', component: DriverAccountComponent},
  {path: 'account-passenger', component: AccountComponent},
  {path: 'account-admin', component: AdminAccountComponent},
  {path: 'account-settings', component: AccountUpdateComponent},
  {path: 'admin-reports', component: AdminReportsComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path:'change-payment-info', component: ChangePaymentInfoComponent},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
