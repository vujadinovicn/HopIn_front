import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { ConfirmValidParentMatcher, passwordMatcher } from '../validators/passwordMatch';
import { passwordRegexValidator } from '../validators/user/userValidator';
import { RequestDetailsService } from '../services/requestDetails.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  role: string = "passenger";

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
              private requestDetailsService : RequestDetailsService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.role = this.userService.role;
    this.setUserData();
    markFormControlsTouched(this.changePasswordForm);
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      if (this.role == "passenger"){
        this.savePassengerPassword();
      }
      else 
        this.saveDriverPassword();
    } else {
      this.sharedService.openInvalidInputSnack()
    }
  }

  private savePassengerPassword() {
    this.userService.updatePassengerPassword(this.setResponseValue()).subscribe({
      next: (res: any) => {
        this.router.navigate(['/account-passenger']);
        this.sharedService.openResponseSnack();
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  private saveDriverPassword() {
    console.log(this.setResponseValue());
    this.requestDetailsService.addPasswordRequest(2, this.setResponseValue()).subscribe({
      next: (res: any) => {
        this.router.navigate(['/account-driver']);
        this.sharedService.openResponseSnack();
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  setUserData() {
    if (this.role == "passenger")
      this.setPassengerData();
    else
      this.setDriverData();
  }

  private setPassengerData() {
    this.userService.getByPassengerId(1).subscribe((res: any) => {
      this.user = res;
    });;
  }

  private setDriverData() {
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
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
      address: this.user.address
    }
  }

}
