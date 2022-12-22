import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger, PassengerService } from '../services/passenger.service';
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

  passenger : Passenger = {
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
              private passengerService: PassengerService,
              private passengerAccountOptionsService: PassengerAccountOptionsService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.setPassengerData();
    markFormControlsTouched(this.changePasswordForm);
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      this.passengerService.updatePassword(this.setResponseValue).subscribe({
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

  setPassengerData() {
    this.passengerService.getById(1).subscribe((res: any) => {
      this.passenger = res;
    });;
  }

  private setResponseValue(): any{
    return {
      name: this.passenger.name,
      surname: this.passenger.surname,
      profilePicture: this.passenger.profilePicture,
      telephoneNumber: this.passenger.telephoneNumber,
      email: this.passenger.email,
      password: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword
    }
  }

}
