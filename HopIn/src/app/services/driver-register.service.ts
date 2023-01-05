import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DriverRegisterService {
  private sentPersonalInfo = new Subject<any>();
  recievedPersonalInfo = this.sentPersonalInfo.asObservable();
  private sentVehicleInfo = new Subject<any>();
  recievedVehicleInfo = this.sentVehicleInfo.asObservable();

  constructor(private http: HttpClient) {}

  sendPersonalInfo(personalInfo: any){
    this.sentPersonalInfo.next(personalInfo);
  }

  recievePersonalInfo() : Observable<any> {
    return this.recievedPersonalInfo;
  }

  sendVehicleInfo(vehicleInfo: any){
    this.sentVehicleInfo.next(vehicleInfo);
  }

  recieveVehicleInfo() : Observable<any> {
    return this.recievedVehicleInfo;
  }
}