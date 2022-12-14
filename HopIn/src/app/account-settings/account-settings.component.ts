import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger, PassengerService } from '../services/passenger.service';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { addressRegexValidator, nameRegexValidator, phonenumRegexValidator, surnameRegexValidator } from '../validators/user/userValidator';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private passengerService: PassengerService,
    private passengerAccountOptionsService : PassengerAccountOptionsService,
    private sharedService : SharedService) {
  }

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

  accountSettingsForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
    surname: new FormControl('', [Validators.required, surnameRegexValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, addressRegexValidator]),
    phonenum: new FormControl('', [Validators.required, phonenumRegexValidator]),
  }, [])

  url = "../../assets/vectors/login.svg";

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }
  
  save(): void {
    if (this.accountSettingsForm.valid) {
      this.passengerService
        .updatePersonalInfo(
          {
            name: this.accountSettingsForm.value.name,
            surname: this.accountSettingsForm.value.surname,
            profilePicture: this.url,
            telephoneNumber: this.accountSettingsForm.value.phonenum,
            email: this.accountSettingsForm.value.email,
            address: this.accountSettingsForm.value.address
          }
        )
        .subscribe({
          next: (res: any) => {
            console.log(res);
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

  sendColorChange(): void {
    this.passengerAccountOptionsService.sendColorChange(
      {
        accountSettingsColor: "dark-blue",
        passwordColor: "dark-gray",
        paymentInfoColor: "dark-gray"
      }
    )
  }

  setPassengerData() {
    this.passengerService.getById(1).subscribe((res: any) => {
      this.passenger = res;
      this.accountSettingsForm.setValue({
        name: res.name,
        surname: res.surname,
        email: res.email,
        address: res.address,
        phonenum: res.telephoneNumber
      })
      this.url = res.profilePicture;
    });;
  }

  

  ngOnInit(): void {
    this.sendColorChange();
    this.setPassengerData();
    markFormControlsTouched(this.accountSettingsForm);
}

}