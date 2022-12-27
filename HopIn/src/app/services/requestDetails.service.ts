import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {
 
  constructor(private http: HttpClient) {}

  getRequestById(requestId: number): Observable<Request> {
    return this.http.get<Request>(environment.apiHost + '/request/' + requestId);
  }

  getPasswordRequestById(requestId: number): Observable<PasswordRequest> {
    return this.http.get<PasswordRequest>(environment.apiHost + '/request/' + requestId + '/password');
  }

}

export interface PasswordRequest {
    id: number;
    oldPassword: String;
    newPassword: String;
    status: String;
}

export interface Request {
    id: number;
    driver: User;
    status: String;
    type: String;
    time: Date;
    reason: String;
    admin: User;
}