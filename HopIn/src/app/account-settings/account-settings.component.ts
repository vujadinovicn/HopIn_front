import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger, PassengerService } from '../services/passenger.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private passengerService: PassengerService) {
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
    name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Zčćđžš ]*")]),
    surname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Zčćđžš ]*")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9 \s,'-]*$")]),
    phonenum: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
  })

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
    console.log(this.url);
    if (this.accountSettingsForm.valid) {
      this.passengerService
        .add(
          {
            name: this.accountSettingsForm.value.name,
            surname: this.accountSettingsForm.value.surname,
            profilePicture: this.url,
            telephoneNumber: this.accountSettingsForm.value.phonenum,
            email: this.accountSettingsForm.value.email,
            address: this.accountSettingsForm.value.address
          }
        )
        .subscribe((res: any) => {
          //console.log(res);
        });
    }
  }

  ngOnInit(): void {
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
      console.log(this.url);
      console.log(res.profilePicture)
    });;
  
}
}