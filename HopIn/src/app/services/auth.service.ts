import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  user$ = new BehaviorSubject(null);
  userState$ = this.user$.asObservable();

  constructor(private http: HttpClient) {
    this.user$.next(this.getRole());
  }

  login(auth: any): Observable<TokenDTO> {
    return this.http.post<TokenDTO>(environment.apiHost + '/user/login', auth, {
      headers: this.headers,
    });
  }

  refresh(): Observable<TokenDTO> {
    const tokens = {
      accessToken: localStorage.getItem('user'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
    return this.http.post<TokenDTO>(environment.apiHost + '/user/refresh', tokens, {
      headers: this.headers,
    });
  }

  getUser(): Observable<any> {
    return this.user$;
  }

  getRole(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).role[0].authority;
      return role;
    }
    return null;
  }

  getEmail(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      console.log(helper.decodeToken(accessToken));
      const role = helper.decodeToken(accessToken).sub;
      return role;
    }
    return null;
  }

  isTokenExpired(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      return helper.isTokenExpired(accessToken);
      
    }
    return false;
  }

  getId(): any {
    if (this.isLoggedIn()) {
      const accessToken: any = localStorage.getItem('user');
      const helper = new JwtHelperService();
      const role = helper.decodeToken(accessToken).id;
      return role;
    }
    return 0;
  }

  isLoggedIn(): boolean {
    if (localStorage.getItem('user') != null) {
      return true;
    }
    return false;
  }

  setUser(): void {
    this.user$.next(this.getRole());
  }

  getToken() {
    return localStorage.getItem('user');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

}

export interface TokenDTO {
    accessToken: Token;
    refreshToken: Token;
}
