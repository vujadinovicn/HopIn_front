import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    password: 'oldPassword',
    newPassword: ''
  }

  constructor(private passengerService: PassengerService,
    private passengerAccountOptionsService: PassengerAccountOptionsService,
    private sharedService: SharedService) { }

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, passwordRegexValidator]),
    newPassword: new FormControl('', [Validators.required, passwordRegexValidator]),
    confNewPassword: new FormControl('', [Validators.required]),
  }, [passwordMatcher("newPassword", "confNewPassword")])

  sendColorChange(): void {
    this.passengerAccountOptionsService.sendColorChange(
      {
        accountSettingsColor: "dark-gray",
        passwordColor: "dark-blue",
        paymentInfoColor: "dark-gray"
      }
    )
  }

  save(): void {
    if (this.changePasswordForm.valid) {
      this.passengerService
        .updatePassword(
          {
            name: this.passenger.name,
            surname: this.passenger.surname,
            profilePicture: this.passenger.profilePicture,
            telephoneNumber: this.passenger.telephoneNumber,
            email: this.passenger.email,
            address: this.passenger.address,
            password: this.changePasswordForm.value.oldPassword,
            newPassword: this.changePasswordForm.value.newPassword
          }
        )
        .subscribe({
          next: (res: any) => {
            this.sharedService.openSnack({
              value: "Response is in console!",
              color: "back-green"}
              );
          },
          error: (error: any) => {
              this.sharedService.openSnack({
                value: "Haven't got data back!",
                color: "back-dark-blue"}
                );
          }
        });
    } else {
      this.sharedService.openSnack({
        value: "Check inputs again!",
        color: "back-red"}
        );
    }
  }

  setPassengerData() {
    this.passengerService.getById(1).subscribe((res: any) => {
      this.passenger = res;
    });;
  }

  ngOnInit(): void {
    this.sendColorChange();
    markFormControlsTouched(this.changePasswordForm);
    this.setPassengerData();
    console.log(this.passenger);
  }

}
