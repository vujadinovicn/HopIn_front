import { Input } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addressRegexValidator, nameRegexValidator, passwordRegexValidator, phonenumRegexValidator, surnameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-driver-register-personal-info',
  templateUrl: './driver-register-personal-info.component.html',
  styleUrls: ['./driver-register-personal-info.component.css']
})
export class DriverRegisterPersonalInfoComponent implements OnInit, OnChanges {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
    surname: new FormControl('', [Validators.required, surnameRegexValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordRegexValidator]),
    address: new FormControl('', [Validators.required, addressRegexValidator]),
    phonenum: new FormControl('', [Validators.required, phonenumRegexValidator]),
  })

  @Input() formsSubmitted = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['formsSubmitted'].currentValue == true){ 
      this.registerForm.markAllAsTouched();
    }
  }

}
