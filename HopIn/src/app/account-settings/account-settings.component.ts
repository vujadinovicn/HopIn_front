import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodsForRoleImpl, User, UserService } from '../services/user.service';
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

  userRole: string = "ROLE_DRIVER";
  userId : number = 0;

  methodsForRole: MethodsForRoleImpl = {
    serviceSendToBackMethod: "",
    serviceGetMethod: "",
    routerNavigation: ""
  };

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
    this.setUserRoleAndId();
    this.generateMethodsForRole();
    this.setUserData();
    markFormControlsTouched(this.accountSettingsForm);
}

  save(): void {
    if (this.accountSettingsForm.valid) {
      this.sendToBack();
    } else {
        this.sharedService.openInvalidInputSnack();
    }
  }

  private sendToBack() {
    this.methodsForRole.serviceSendToBackMethod().subscribe({
      next: (res: any) => {
        this.methodsForRole.routerNavigation();
        this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"
        }
        );
        console.log(res);
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  setUserData() {
    this.methodsForRole.serviceGetMethod(this.userId).subscribe((res: any) => {
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

  private setUserRoleAndId() {
    this.authService.getUser().subscribe((res) => {
      this.userRole = res;
      this.userId = this.authService.getId();
    });
  }

  private generateMethodsForRole() {
    if (this.userRole == "ROLE_PASSENGER") {
      this.methodsForRole.serviceSendToBackMethod = () => {
        return this.userService.updatePassengerPersonalInfo(this.setResponseValue());
      }
      this.methodsForRole.serviceGetMethod = (id: number) => this.userService.getByPassengerId(id);
      this.methodsForRole.routerNavigation = () => this.router.navigate(['/account-passenger']);
    }else if (this.userRole == "ROLE_DRIVER") {
      this.methodsForRole.serviceSendToBackMethod = () => {
        return this.requestDetailsService.addInfoRequest(this.userId, this.setResponseValue());
      }
      this.methodsForRole.serviceGetMethod = (id: number) => this.userService.getByDriverId(id);
      this.methodsForRole.routerNavigation = () => this.router.navigate(['/account-driver']);
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
      id: this.userId,
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