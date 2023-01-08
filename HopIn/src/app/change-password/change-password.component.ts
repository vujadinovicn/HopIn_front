import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MethodsForRoleImpl, User, UserService } from '../services/user.service';
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

  role: string = "ROLE_DRIVER";
  id: number = 0;
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
    this.getRoleAndId();
    this.generateMethodsForRole();
    this.setUserData();
    markFormControlsTouched(this.changePasswordForm);
  }

  save(): void {
    if (this.changePasswordForm.valid) {
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
      error: () => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  setUserData() {
    this.methodsForRole.serviceGetMethod(this.id).subscribe((res: any) => {
      this.user = res;
    });;
  }

  private getRoleAndId() {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      this.id = this.authService.getId();
    });
  }

  private generateMethodsForRole() {
    if (this.role == "ROLE_PASSENGER") {
      this.methodsForRole.serviceSendToBackMethod = () => {
        return this.userService.updatePassengerPassword(this.setResponseValue());
      }
      this.methodsForRole.serviceGetMethod = (id: number) => this.userService.getByPassengerId(id);
      this.methodsForRole.routerNavigation = () => this.router.navigate(['/account-passenger']);
    }else if (this.role == "ROLE_DRIVER") {
      this.methodsForRole.serviceSendToBackMethod = () => {
        return this.requestDetailsService.addPasswordRequest(this.id, this.setOnlyPasswordResponseValue());
      }
      this.methodsForRole.serviceGetMethod = (id: number) => this.userService.getByDriverId(id);
      this.methodsForRole.routerNavigation = () => this.router.navigate(['/account-driver']);
    }
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

  private setOnlyPasswordResponseValue(): any {
    return {
      oldPassword: this.changePasswordForm.value.oldPassword,
      newPassword: this.changePasswordForm.value.newPassword,
    }
  }
}