import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit {

  constructor() { }

  accountSettingsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', [Validators.required]),
    phonenum: new FormControl('', [Validators.required]),
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
      alert("PARTIZAN SAMPION");
    }
  }

  ngOnInit(): void {
  }

}
