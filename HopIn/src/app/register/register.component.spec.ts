import { SharedService } from './../shared/shared.service';
import { User, UserDTO, UserService } from './../services/user.service';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { RegisterComponent, resetForm } from './register.component';
import { Overlay } from '@angular/cdk/overlay';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceSpy: any;
  let sharedServiceSpy: any;
  let resetFormSpy: jasmine.Spy;

  let user: User = {
    id: 1,
    name: "Mika",
    surname: "Mikic",
    profilePicture: '',
    email: "mika@gmail.com",
    telephoneNumber: "0628090111",
    password: "123",
    address: "123", 
    blocked: false,
    newPassword: ''
  }

  let userDTO: UserDTO = {
    name: "Mika",
    surname: "Mikic",
    profilePicture: '',
    email: "mika@gmail.com",
    telephoneNumber: "0628090111",
    password: "123",
    address: "Neka Adresa"
  }

  beforeEach(async () => {

    userServiceSpy = jasmine.createSpyObj<UserService>(['registerPassenger']);

    

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ HttpClientModule, FormsModule, MatDialogModule, ReactiveFormsModule],
      providers: [{provide: UserService,
        useValue: userServiceSpy,
        }, Overlay, MatDialog,
        {provide: SharedService,
          useValue: {
          openSnack: jasmine.createSpy(),
        }}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    sharedServiceSpy = TestBed.inject(SharedService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('name input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('name input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('1Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('surname input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mikagmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('surname input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic5');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('address input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('address input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('123$');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('phonenum input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('phonenum input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('abc');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('email input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('email input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mikagmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('password input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('');
    component.registerForm.controls['confpass'].setValue('123');
    
    expect(component.registerForm.controls['password'].valid).toBeFalsy();
    expect(component.registerForm.controls['confpass'].valid).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('password input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('$');
    component.registerForm.controls['confpass'].setValue('123');
    
    expect(component.registerForm.controls['password'].valid).toBeFalsy();
    expect(component.registerForm.controls['confpass'].valid).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('confirmation password input should be invalid when empty', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('');

    expect(component.registerForm.controls['password'].valid).toBeTruthy();
    expect(component.registerForm.controls['confpass'].valid).toBeFalsy();
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('confirmation password input should be invalid when format invalid', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('$');
    
    expect(component.registerForm.controls['password'].valid).toBeTruthy();
    expect(component.registerForm.controls['confpass'].valid).toBeFalsy();
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('form should not be valid when password and confirmation password dont match', () => {
    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('1234');
    
    expect(component.registerForm.controls['password'].valid).toBeTruthy();
    expect(component.registerForm.controls['confpass'].valid).toBeTruthy();
    expect(component.registerForm.valid).toBeFalsy;
  });

  it('should register passenger', () => {
    userServiceSpy.registerPassenger.and.returnValue(of(user));

    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');

    expect(component.registerForm.valid).toBeTruthy;

    const btn = fixture.debugElement.query(By.css('.conf-button')).nativeElement;
    btn.click();

    expect(userServiceSpy.registerPassenger).toHaveBeenCalledWith(userDTO);
    expect(userServiceSpy.registerPassenger).toHaveBeenCalledTimes(1);
    expect(sharedServiceSpy.openSnack).toHaveBeenCalledTimes(1);
    expect(sharedServiceSpy.openSnack).toHaveBeenCalledWith({
      value: "Registration successful, activation email has been sent to " + user.email,
      color: "back-green"
    });

    // expect(resetFormSpy).toHaveBeenCalled();
  });

  it('should show an error message if the registration is unsuccessful', () => {
    userServiceSpy.registerPassenger.and.returnValue(throwError(new HttpErrorResponse({})));

    component.registerForm.controls['name'].setValue('Mika');
    component.registerForm.controls['surname'].setValue('Mikic');
    component.registerForm.controls['address'].setValue('Neka Adresa');
    component.registerForm.controls['email'].setValue('mika@gmail.com');
    component.registerForm.controls['phonenum'].setValue('0628090111');
    component.registerForm.controls['password'].setValue('123');
    component.registerForm.controls['confpass'].setValue('123');

    expect(component.registerForm.valid).toBeTruthy;

    const btn = fixture.debugElement.query(By.css('.conf-button')).nativeElement;
    btn.click();

    expect(userServiceSpy.registerPassenger).toHaveBeenCalledWith(userDTO);
    expect(userServiceSpy.registerPassenger).toHaveBeenCalledTimes(1);
    expect(sharedServiceSpy.openSnack).toHaveBeenCalledTimes(1);
    expect(sharedServiceSpy.openSnack).toHaveBeenCalledWith({
      value: "Registration failed, email may already be in use.",
      color: "back-red"
    });
  });



});
