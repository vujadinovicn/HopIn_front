import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor() {
  }

  accountSettingsForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    surname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z0-9\s,'-]*$")]),
    phonenum: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]),
  })

  url = "../../assets/vectors/login.svg";

  onFileSelect(e: any){
    if (e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
  }
  
  save(): void {
    if (this.accountSettingsForm.valid) {
      alert("partizan sampion");
    }
  }

  ngOnInit(): void {
}}
