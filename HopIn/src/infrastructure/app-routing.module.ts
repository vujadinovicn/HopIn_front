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

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'order-ride', component: OrderRideComponent},
  {path: 'account', component: AccountComponent},
  {path: 'account-settings', component: AccountSettingsComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path:'change-payment-info', component: ChangePaymentInfoComponent},
  {path: '**', component: LandingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
