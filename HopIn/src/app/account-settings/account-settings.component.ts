import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserService } from '../services/user.service';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { addressRegexValidator, nameRegexValidator, phonenumRegexValidator, surnameRegexValidator } from '../validators/user/userValidator';
import { RequestDetailsService } from '../services/requestDetails.service';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  role: string = "ROLE_DRIVER";
  id : number = 0;

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

  profileImgPath = "../../assets/images/profile-placeholder.png";

  constructor(private router: Router, 
              private authService: AuthService,
              private userService: UserService,
              private requestDetailsService : RequestDetailsService,
              private sharedService : SharedService) {
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      this.id = this.authService.getId();
    })
    this.setUserData();
    markFormControlsTouched(this.accountSettingsForm);
}
  
  save(): void {
    if (this.accountSettingsForm.valid) {
      if (this.role == "ROLE_PASSENGER")
        this.savePassenger();
      else if (this.role == "ROLE_DRIVER")
        this.saveDriver();
      else {}
    } else
        this.sharedService.openInvalidInputSnack();

  }

  savePassenger(){
    this.userService.updatePassengerPersonalInfo(this.setResponseValue()).subscribe({
      next: (res: any) => {
        this.router.navigate(['/account-passenger']);
        this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"}
          );
        console.log(res);
      },
      error: (error: any) => {
          this.sharedService.openNoResponseSnack();
      }
    });
  }

  saveDriver(){
    console.log(this.setResponseValue());
    this.requestDetailsService.addInfoRequest(this.id, this.setResponseValue()).subscribe({
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
  }

  setUserData(){
    if (this.role == "ROLE_PASSENGER") {
      this.setPassengerData();
    }
    else if (this.role == "ROLE_DRIVER"){
      this.setDriverData();
    }
    else {}
  }

  setPassengerData() {
    this.userService.getByPassengerId(this.id).subscribe((res: any) => {
      this.user = res;
      this.setFormValue(res);
      if (res.profilePicture != null)
        this.profileImgPath = res.profilePicture;
    });;
  }

  setDriverData(){
    this.userService.getByDriverId(this.id).subscribe((res: any) => {
      this.user = res;
      this.setFormValue(res);
      if (res.profilePicture != null)
        this.profileImgPath = res.profilePicture;
    });;
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
      id: this.id,
      name: this.accountSettingsForm.value.name,
      surname: this.accountSettingsForm.value.surname,
      profilePicture: this.profileImgPath,
      telephoneNumber: this.accountSettingsForm.value.phonenum,
      email: this.accountSettingsForm.value.email,
      address: this.accountSettingsForm.value.address,
      password: this.user.password
    }
  }

}