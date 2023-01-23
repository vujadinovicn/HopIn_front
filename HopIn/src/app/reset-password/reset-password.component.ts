import { SharedService } from './../shared/shared.service';
import { User, UserService, ResetPasswordDTO } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { ConfirmValidParentMatcher, passwordMatcher } from '../validators/passwordMatch';
import { passwordRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required, passwordRegexValidator]),
    confpass: new FormControl('', [Validators.required, passwordRegexValidator])
  }, [passwordMatcher("password", "confpass")])


  code: string = '';
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor(private route: ActivatedRoute, private userService: UserService,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.resetPasswordForm);

    this.route.queryParams
      .subscribe(params => {
        this.code = params['code'];
        console.log(this.code);
      }
    );
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      let dto: ResetPasswordDTO = {
        code: this.code,
        newPassword: this.resetPasswordForm.value.password!
      }
      this.userService.resetPassword(dto).subscribe({
        next: (res) => {
          this.sharedService.openSnack({
            value: "Password successfully changed!",
            color: "back-green"
          });
        },
        error: (err) => {
          console.log(err);
          this.sharedService.openSnack({
            value: err.error.message,
            color: "back-red"
          });
        }
      });
    }
  }

}
