import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { addressRegexValidator, nameRegexValidator, passwordRegexValidator, phonenumRegexValidator, surnameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-driver-register-personal-info',
  templateUrl: './driver-register-personal-info.component.html',
  styleUrls: ['./driver-register-personal-info.component.css']
})
export class DriverRegisterPersonalInfoComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
    surname: new FormControl('', [Validators.required, surnameRegexValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordRegexValidator]),
    address: new FormControl('', [Validators.required, addressRegexValidator]),
    phonenum: new FormControl('', [Validators.required, phonenumRegexValidator]),
  })

  constructor() { }

  ngOnInit(): void {
  }

}
