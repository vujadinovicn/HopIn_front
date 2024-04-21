import { SocketService } from './../services/socket.service';
import { RedirectionService } from './../services/redirection.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isVisible : boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthService, 
    private router: Router,
    public snackBar: MatSnackBar,
    private socketService: SocketService,
    private redirectionService: RedirectionService) { }

  ngOnInit(): void {
  }

  login(){
    const loginVal = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (this.loginForm.valid) {
      this.authService.login(loginVal).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result.accessToken));
          localStorage.setItem('refreshToken', JSON.stringify(result.refreshToken));
          this.authService.setUser();
          this.redirectionService.openHome(this.authService.getRole());
        },
        error: (error) => {
          console.log(error)
          this.snackBar.open("Bad credentials. Please, try again!", "", {
            duration: 2000,
         });
        },
      });
    }
  }
}
