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

  getPassenger(id: number): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(environment.apiHost + '/passenger/' + id);
  }

  getDriver(id: number): Observable<ReturnedDriver> {
    return this.http.get<ReturnedDriver>(environment.apiHost + '/driver/' + id);
  }

  getUser(id: number): Observable<ReturnedDriver> {
    return this.http.get<ReturnedDriver>(environment.apiHost + '/user/' + id);
  }
}
