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

  getVehicleRequestById(requestId: number): Observable<VehicleRequest> {
    return this.http.get<VehicleRequest>(environment.apiHost + '/request/' + requestId + '/vehicle');
  }

  getInfoRequestById(requestId: number): Observable<InfoRequest> {
    return this.http.get<InfoRequest>(environment.apiHost + '/request/' + requestId + '/info');
  }

  getDocumentRequestById(requestId: number): Observable<DocumentRequest> {
    return this.http.get<DocumentRequest>(environment.apiHost + '/request/' + requestId + '/document');
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

export interface InfoRequest {
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
    status: string;
}

export interface VehicleRequest {
  id: number;
  model: String;
  licenseNumber: String;
  passengerSeats: number;
  babyTransport: boolean;
  petTransport: boolean;
  status: String;
}

export interface DocumentRequest {
  id: number;
  name: String;
  docuementImage: String;
  documentOperationType: String;
  status: String;
}