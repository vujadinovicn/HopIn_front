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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confpass: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phonenum: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registerForm)
    if (this.registerForm.valid) {
      console.log(this.registerForm)
    }
  }

}
