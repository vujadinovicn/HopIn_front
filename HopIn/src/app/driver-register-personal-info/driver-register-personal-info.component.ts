import { EventEmitter, Input, Output } from '@angular/core';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DriverRegisterService } from '../services/driver-register.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
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

  @Input() formsSubmitted = false;
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private driverRegisterService: DriverRegisterService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.registerForm);
    this.driverRegisterService.recieveFormsSubmitted().subscribe(() => {
      this.registerForm.markAllAsTouched();
      this.saveDriverRegister();
    })
  }

  private saveDriverRegister(){
    if (this.registerForm.valid) {
      this.driverRegisterService.sendPersonalInfo(this.setResponseValue());
    }
    else {
      this.sharedService.openInvalidInputSnack(); 
     }
    this.isFormValid.emit(this.registerForm.valid);
  }

  private setResponseValue(): any{
    return {
      name: this.registerForm.value.name,
      surname: this.registerForm.value.surname,
      telephoneNumber: this.registerForm.value.phonenum,
      email: this.registerForm.value.email,
      address: this.registerForm.value.address,
      password: this.registerForm.value.password
    }
  }

}
