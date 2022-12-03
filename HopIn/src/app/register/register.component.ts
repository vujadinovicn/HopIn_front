import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confpass: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phonenum: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.valid) {
      alert("uspeh")
    }
  }

}
