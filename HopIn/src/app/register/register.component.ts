import { SharedService } from './../shared/shared.service';
import { User, UserDTO } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { passwordMatcher } from '../validators/passwordMatch';
import { ConfirmValidParentMatcher } from '../validators/passwordMatch';
import { HttpErrorResponse } from '@angular/common/http';
import { nameRegexValidator, surnameRegexValidator, addressRegexValidator, phonenumRegexValidator, passwordRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  constructor(private userService: UserService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  register() {
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
          console.log(response);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        }
      });
    }
  }

}
