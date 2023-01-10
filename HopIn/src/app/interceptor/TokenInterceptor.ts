import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent
} from '@angular/common/http';

import { Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
    public snackBar: MatSnackBar,
    private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isLoggedIn()) {

      if (this.auth.isTokenExpired()) {
        localStorage.removeItem('user');
        this.auth.setUser();
        this.router.navigate(['login']);
        this.snackBar.open("Your access token has expired!", "", {
            duration: 2000,
         });
      }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}` 
        }
      });
    }
    return next.handle(request);
  }
}