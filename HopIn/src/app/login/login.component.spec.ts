import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from './../services/auth.service';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ HttpClientModule, FormsModule, MatDialogModule, ReactiveFormsModule],
      providers: [AuthService, Overlay, MatDialog,
      MatSnackBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.title'));
    el = de.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should title be present', () => {
    expect(el.innerHTML).toEqual('Welcome back');
  });


});
