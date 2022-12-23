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

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'order-ride', component: OrderRideComponent},
  {path: 'route-suggestion', component: RouteSuggestionComponent},
  {path: 'account-driver', component: DriverAccountComponent},
  {path: 'account-passenger', component: AccountComponent},
  {path: 'account-settings', component: AccountUpdateComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path:'change-payment-info', component: ChangePaymentInfoComponent},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
