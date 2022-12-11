import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmValidParentMatcher, passwordMatcher } from '../validators/passwordMatch';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  confirmValidParentMatcher = new ConfirmValidParentMatcher();

  constructor() { }

  changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confNewPassword: new FormControl('', [Validators.required]),
  }, [passwordMatcher("newPassword", "confNewPassword")])

  save(): void {
    if (this.changePasswordForm.valid) {
      alert("PARTIZAN SAMPION");
    }
  }

  ngOnInit(): void {
  }

}
