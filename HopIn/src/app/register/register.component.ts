import { SharedService } from './../shared/shared.service';
import { User, UserDTO } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { passwordMatcher } from '../validators/passwordMatch';
import { ConfirmValidParentMatcher } from '../validators/passwordMatch';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { nameRegexValidator, surnameRegexValidator, addressRegexValidator, phonenumRegexValidator, passwordRegexValidator } from '../validators/user/userValidator';
import { markFormControlsTouched } from '../validators/formGroupValidators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  profileImgPath: string = '';

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
    surname: new FormControl('', [Validators.required, surnameRegexValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordRegexValidator]),
    confpass: new FormControl('', [Validators.required, passwordRegexValidator]),
    address: new FormControl('', [Validators.required, addressRegexValidator]),
    phonenum: new FormControl('', [Validators.required, phonenumRegexValidator]),
  }, [passwordMatcher("password", "confpass")])

  constructor(private userService: UserService, private sharedService: SharedService, private http: HttpClient) { }

  ngOnInit(): void {
    markFormControlsTouched(this.registerForm);
  }

  register(formDirective: FormGroupDirective) {
    if (this.registerForm.valid) {
      let newPassanger: UserDTO = {
        name: this.registerForm.value.name!,
        surname: this.registerForm.value.surname!,
        profilePicture: '',
        email: this.registerForm.value.email!,
        telephoneNumber: this.registerForm.value.phonenum!,
        password: this.registerForm.value.password!,
        address: this.registerForm.value.address!
      }
      this.userService.registerPassenger(newPassanger).subscribe({
        next: (response: User) => {
          this.sharedService.openSnack({
            value: "Registration successful, activation email has been sent to " + this.registerForm.value.email,
            color: "back-green"
          });
          
          resetForm(this.registerForm, formDirective);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          this.sharedService.openSnack({
            value: "Registration failed, email may already be in use.",
            color: "back-red"
          });
        }
      });
    }
  }
}

export function resetForm(form: FormGroup, fromDirective: FormGroupDirective) {
  fromDirective.resetForm();
  form.reset();
  form.markAsPristine();
  form.markAsUntouched();
  form.updateValueAndValidity();     
}
