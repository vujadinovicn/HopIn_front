import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { throwError, Observable, BehaviorSubject, of, finalize } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  isRefresh: boolean = false;

  constructor(private auth: AuthService,
    public snackBar: MatSnackBar,
    private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth.isLoggedIn()) {

      // if (this.auth.isTokenExpired()) {
      //   localStorage.removeItem('user');
      //   this.auth.setUser();
      //   this.router.navigate(['login']);
      //   this.snackBar.open("Your access token has expired!", "", {
      //       duration: 2000,
      //    });
      // }

      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.getToken()}` 
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status == 401) {
          if (!this.isRefresh) {
            console.log('REFRESH');
            this.isRefresh = true;
            this.auth.refresh().subscribe({
              next: (result) => {
                localStorage.setItem('user', JSON.stringify(result.accessToken));
                localStorage.setItem('refreshToken', JSON.stringify(result.refreshToken));
                this.auth.setUser();
              },
            });
          } else {
              this.isRefresh = false;
              localStorage.removeItem('user');
              localStorage.removeItem('refreshToken');
              this.auth.setUser();
              this.router.navigate(['login']);
              this.snackBar.open("Your access token has expired!", "", {
                  duration: 2000,
              });
          }
        }
        return throwError(error);
     })
    )
  }
}