import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { ConfirmValidParentMatcher, passwordMatcher } from '../validators/passwordMatch';
import { passwordRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user : User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    address: '',
    telephoneNumber: '',
    profilePicture: '',
    password: '',
    newPassword: ''
  }
  
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, passwordRegexValidator]),
    newPassword: new FormControl('', [Validators.required, passwordRegexValidator]),
    confNewPassword: new FormControl('', [Validators.required]),
  }, [passwordMatcher("newPassword", "confNewPassword")])

  constructor(private router: Router,
              private userService: UserService,
              private passengerAccountOptionsService: PassengerAccountOptionsService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.setUserData();
    markFormControlsTouched(this.changePasswordForm);
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      console.log(this.setResponseValue())
      this.userService.updateDriverPassword(this.setResponseValue()).subscribe({
          next: (res: any) => {
            this.router.navigate(['/account']);
            this.sharedService.openResponseSnack()
          },
          error: (error: any) => {
              this.sharedService.openNoResponseSnack();
          }
        });
    } else {
      this.sharedService.openInvalidInputSnack()
    }
  }

  setUserData() {
    this.userService.getByDriverId(2).subscribe((res: any) => {
      this.user = res;
    });;
  }

  private setResponseValue(): any{
    return {
      name: this.user.name,
      surname: this.user.surname,
      profilePicture: this.user.profilePicture,
      telephoneNumber: this.user.telephoneNumber,
      email: this.user.email,
      password: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      address: this.user.address
    }
  }

}
