import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { passwordMatcher } from '../validators/passwordMatch';
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

  constructor(private route: ActivatedRoute) { }

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

  }

}
