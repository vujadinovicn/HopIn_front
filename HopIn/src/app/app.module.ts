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
import { AccountDetailsComponent } from './account-details/account-details.component';
import { FavouriteRoutesComponent } from './favourite-routes/favourite-routes.component';
import { AccountComponent } from './account/account.component';
import { UserGraphComponent } from './user-graph/user-graph.component';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RegisterComponent,
    LoginComponent,
    LandingComponent,
    AccountDetailsComponent,
    FavouriteRoutesComponent,
    AccountComponent,
    UserGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    NgxDaterangepickerMd.forRoot(),
    HttpClientModule
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline', hideRequiredMarker: 'true' }}],
  bootstrap: [AppComponent]
})
export class AppModule { }
