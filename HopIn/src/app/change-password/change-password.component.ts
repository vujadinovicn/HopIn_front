import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { ConfirmValidParentMatcher, passwordMatcher } from '../validators/passwordMatch';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private passengerAccountOptionsService: PassengerAccountOptionsService) { }

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required, Validators.pattern("[0-9a-zA-Z]+"), Validators.minLength(6)]),
    newPassword: new FormControl('', [Validators.required, Validators.pattern("[0-9a-zA-Z]+"), Validators.minLength(6)]),
    confNewPassword: new FormControl('', [Validators.required]),
  }, [passwordMatcher("newPassword", "confNewPassword")])

  save(): void {
    if (this.changePasswordForm.valid) {
      alert("PARTIZAN SAMPION");
    }
  }

  sendColorChange(): void {
    this.passengerAccountOptionsService.sendColorChange(
      {
        accountSettingsColor: "dark-gray",
        passwordColor: "dark-blue",
        paymentInfoColor: "dark-gray"
      }
    )
  }

  ngOnInit(): void {
    this.sendColorChange();
  }

}
