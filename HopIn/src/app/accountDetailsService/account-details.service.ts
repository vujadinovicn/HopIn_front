import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnedDriver, ReturnedUser } from '../account-details/account-details.component';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  constructor(private http: HttpClient) { }

  getPassenger(): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(environment.apiHost + '/passenger/1');
  }

  getDriver(): Observable<ReturnedDriver> {
    return this.http.get<ReturnedDriver>(environment.apiHost + '/driver/2');
  }

  getUser(): Observable<ReturnedDriver> {
    return this.http.get<ReturnedDriver>(environment.apiHost + '/user/1');
  }
}
