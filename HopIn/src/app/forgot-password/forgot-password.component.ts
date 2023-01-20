import { SharedService } from './../shared/shared.service';
import { UserService } from './../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  })

  constructor(private userService: UserService, private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  requestReset() {
    if (this.forgotPasswordForm.valid) 
      this.userService.sendResetPasswordEmail(this.forgotPasswordForm.value.email!).subscribe({
        next: (res) => {
          this.sharedService.openSnack({
            value: "Email with reset code has been sent!",
            color: "back-green"
          })
        },
        error: (err) => {
          this.sharedService.openSnack({
            value: err.error,
            color: "back-red"
          })
        }
      });
  }

}
