import { throwError } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService, TokenDTO } from './../services/auth.service';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SocketService } from '../services/socket.service';
import { RedirectionService } from '../services/redirection.service';
import { HttpClientModule } from '@angular/common/http';
import { Overlay } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Token, TokenType } from '@angular/compiler';
import { Observable, of, Subscription } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let authServiceSpy: any;
  let redirectionService: RedirectionService
  let snackBar: MatSnackBar
  const tokenDTO: TokenDTO = {
    accessToken: new Token(1, 1, TokenType.String, 1, "accessToken"),
    refreshToken: new Token(1, 1, TokenType.String, 1, "refreshToken")
  }

  beforeEach(async () => {

    // authServiceSpy = initMockAuthService();
    authServiceSpy = jasmine.createSpyObj<AuthService>(['login', 'setUser', 'getRole']);

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientModule, FormsModule, MatDialogModule, ReactiveFormsModule],
      providers: [{provide: AuthService,
        useValue: authServiceSpy,
      }, Overlay, MatDialog,
      {provide: RedirectionService,
        useValue: {
        openHome: jasmine.createSpy(),
      }},
      {provide: MatSnackBar,
        useValue: {
        open: jasmine.createSpy(),
      }}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    redirectionService = TestBed.inject(RedirectionService);
    snackBar = TestBed.inject(MatSnackBar);



    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should title be present', () => {
    expect(el.innerHTML).toEqual('Welcome back');
  });

  it('email input should be invalid when empty', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('1');
    expect(component.loginForm.valid).toBeFalsy;
  });

  it('email input should be invalid when format invalid', () => {
    component.loginForm.controls['email'].setValue('mika');
    component.loginForm.controls['password'].setValue('1');
    expect(component.loginForm.valid).toBeFalsy;
  });

  it('password input should be invalid when empty', () => {
    component.loginForm.controls['email'].setValue('mika@gmail.com');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy;
  });

  it('login should be performed', () => {
    authServiceSpy.login.and.returnValue(of(tokenDTO));

    component.loginForm.controls['email'].setValue('mika@gmail.com');
    component.loginForm.controls['password'].setValue('123');

    expect(component.loginForm.valid).toBeTruthy();

    const btn = fixture.debugElement.query(By.css('#login-container button')).nativeElement;
    btn.click();

    expect(authServiceSpy.login).toHaveBeenCalledWith({ email: 'mika@gmail.com', password: '123' });
    expect(authServiceSpy.login).toHaveBeenCalledTimes(1);
    expect(redirectionService.openHome).toHaveBeenCalledTimes(1);
    expect(localStorage.getItem('user')).toBeTruthy;
    expect(localStorage.getItem('refreshToken')).toBeTruthy;
});


it('should show an error message if the login is unsuccessful', () => {
  authServiceSpy.login.and.returnValue(throwError(''));
  component.loginForm.controls['email'].setValue('test@email.com');
  component.loginForm.controls['password'].setValue('password');
  component.login();
  expect(snackBar.open).toHaveBeenCalledWith('Bad credentials. Please, try again!', '', Object({ duration: 2000 }));
});

});
