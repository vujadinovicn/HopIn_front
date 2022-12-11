import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-passenger-account-settings',
  templateUrl: './passenger-account-settings.component.html',
  styleUrls: ['./passenger-account-settings.component.css']
})
export class PassengerAccountSettingsComponent implements OnInit {

  constructor() { }

  accountSettingsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    city: new FormControl('', [Validators.required]),
    phonenum: new FormControl('', [Validators.required]),
  })

  save(): void {
    if (this.accountSettingsForm.valid) {
      alert("PARTIZAN SAMPION");
    }
  }

  ngOnInit(): void {
  }

}
