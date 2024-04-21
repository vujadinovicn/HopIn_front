import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class RequestDetailsService {

  public role: string = "admin";

  private requestId = new Subject<any>();
  private detailsDisplayed = new BehaviorSubject<any>({});
  private isRequestSelected = new BehaviorSubject<any>({});
  
 
  constructor(private http: HttpClient) {}

  sendRequest(request: any): void {
    this.requestId.next(request);
  }

  recieveRequest(): Observable<any> {
    return this.requestId.asObservable();
  }

  sendDetailsDisplayed(isDisplayed: any): void {
    this.detailsDisplayed.next(isDisplayed);
  }

  recieveDetailsDisplayed(): Observable<any> {
    return this.detailsDisplayed.asObservable();
  }

  sendIsRequestSelected(isSelected: any): void {
    this.isRequestSelected.next(isSelected);
  }

  recieveIsRequestSelected(): Observable<any> {
    return this.isRequestSelected.asObservable();
  }

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

  addPasswordRequest(driverId: number, passwordRequest: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<any>(environment.apiHost + '/request/' + driverId + '/password/request', passwordRequest, options);
  }

  sendDocumentRequest(driverId: number, operationNumber: number, documentRequest: any, documentId: number): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<any>(environment.apiHost + '/request/' + driverId + '/' + operationNumber + "/" + documentId +'/document/request', documentRequest, options);
  }

  addInfoRequest(driverId: number, infoRequest: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<any>(environment.apiHost + '/request/' + driverId + '/info/request', infoRequest, options);
  }

  addVehicleRequest(driverId: number, vehicleRequest: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<any>(environment.apiHost + '/request/' + driverId + '/vehicle/request', vehicleRequest, options);
  }

  acceptRequest(requestId: number, adminId: number): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<String>(environment.apiHost + '/request/' + requestId + "/" + adminId + "/accept", options);
  }

  declineRequest(requestId: number, adminId: number, reason: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<String>(environment.apiHost + '/request/' + requestId + "/" + adminId + "/deny", reason, options);
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
  vehicleType: String;
}

export interface DocumentRequest {
  id: number;
  name: String;
  docuementImage: String;
  documentOperationType: String;
  status: String;
}

export interface AcceptedRequest {
  id: number,
  adminId: number
}

export interface DeclinedRequest {
  id: number,
  adminId: number,
  reason: String
}