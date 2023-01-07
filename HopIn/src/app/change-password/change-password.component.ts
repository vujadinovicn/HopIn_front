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
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  role: string = "driver";
  id: number = 0;

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
              private authService: AuthService,
              private userService: UserService,
              private requestDetailsService : RequestDetailsService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      this.id = this.authService.getId();
    })
    this.setUserData();
    markFormControlsTouched(this.changePasswordForm);
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      if (this.role == "ROLE_PASSENGER"){
        this.savePassengerPassword();
      }
      else if (this.role == "ROLE_DRIVER")
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
    let res = {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
    }
    this.requestDetailsService.addPasswordRequest(this.id, res).subscribe({
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
    if (this.role == "ROLE_PASSENGER")
      this.setPassengerData();
    else if (this.role == "ROLE_DRIVER")
      this.setDriverData();
  }

  private setPassengerData() {
    this.userService.getByPassengerId(this.id).subscribe((res: any) => {
      this.user = res;
    });;
  }

  private setDriverData() {
    this.userService.getByDriverId(this.id).subscribe((res: any) => {
      this.user = res;
    });;
  }

  private setResponseValue(): any{
    return {
      id: this.id,
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
