import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReturnedUser } from '../account-details/account-details.component';

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<ReturnedUser> {
    return this.http.get<ReturnedUser>(environment.apiHost + '/passenger/1');
  }
}
