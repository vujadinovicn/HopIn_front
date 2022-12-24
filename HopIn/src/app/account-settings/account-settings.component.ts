import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';
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

  _role: String = 'driver';
  user : User = {
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

  profileImgPath = "../../assets/vectors/login.svg";

  constructor(private router: Router, 
              private userService: UserService,
              private sharedService : SharedService) {
  }

  ngOnInit(): void {
    this.setUserData();
    markFormControlsTouched(this.accountSettingsForm);
}
  
  save(): void {
    if (this._role === 'driver') {
      this.saveDriver();
    } else if (this._role === 'passenger') {
      this.savePassenger();
    } else {
      this.saveAdmin();
    }

  }

  setUserData() {
    if (this._role === 'driver') {
      this.userService.getByDriverId(2).subscribe((res: any) => {
        this.user = res;
        this.setFormValue(res);
        this.profileImgPath = res.profilePicture;
      });;
    } else if (this._role === 'passenger') {
      this.userService.getByPassengerId(1).subscribe((res: any) => {
        this.user = res;
        this.setFormValue(res);
        this.profileImgPath = res.profilePicture;
      });;
    } else {
      this.userService.getByAdminId(1).subscribe((res: any) => {
        this.user = res;
        this.setFormValue(res);
        this.profileImgPath = res.profilePicture;
      });;
    }
  }

  onImageSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.profileImgPath = reader.result as string;
      }
    }
  }

  private setFormValue(res: any){
    this.accountSettingsForm.setValue({
      name: res.name,
      surname: res.surname,
      email: res.email,
      address: res.address,
      phonenum: res.telephoneNumber
    })
  }

  private setResponseValue(): any{
    return {
      name: this.accountSettingsForm.value.name,
      surname: this.accountSettingsForm.value.surname,
      profilePicture: this.profileImgPath,
      telephoneNumber: this.accountSettingsForm.value.phonenum,
      email: this.accountSettingsForm.value.email,
      address: this.accountSettingsForm.value.address,
      password: this.user.password
    }
  }

  private saveDriver(): void {
    if (this.accountSettingsForm.valid) {
      console.log(this.setResponseValue());
      this.userService.updateDriverPersonalInfo(this.setResponseValue()).subscribe({
          next: (res: any) => {
            this.router.navigate(['/account-driver']);
            this.sharedService.openSnack({
              value: "Response is in console!",
              color: "back-green"}
              );
          },
          error: (error: any) => {
              this.sharedService.openNoResponseSnack();
          }
        });
    } else
        this.sharedService.openInvalidInputSnack();
  }

  private savePassenger(): void {
    if (this.accountSettingsForm.valid) {
      console.log(this.setResponseValue());
      this.userService.updatePassengerPersonalInfo(this.setResponseValue()).subscribe({
          next: (res: any) => {
            this.router.navigate(['/account-passenger']);
            this.sharedService.openSnack({
              value: "Response is in console!",
              color: "back-green"}
              );
          },
          error: (error: any) => {
              this.sharedService.openNoResponseSnack();
          }
        });
    } else
        this.sharedService.openInvalidInputSnack();
  }

  private saveAdmin(): void {
    if (this.accountSettingsForm.valid) {
      console.log(this.setResponseValue());
      this.userService.updateAdminPersonalInfo(this.setResponseValue()).subscribe({
          next: (res: any) => {
            this.router.navigate(['/account-admin']);
            this.sharedService.openSnack({
              value: "Response is in console!",
              color: "back-green"}
              );
          },
          error: (error: any) => {
              this.sharedService.openNoResponseSnack();
          }
        });
    } else
        this.sharedService.openInvalidInputSnack();
  }

}