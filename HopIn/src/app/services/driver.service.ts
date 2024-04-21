import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllUsersDTO } from './passenger.service';
import { LocationNoId } from './vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private http: HttpClient) {}

  add(driver: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<string>(environment.apiHost + '/driver', driver, options);
  }

  getAll() : Observable<AllUsersDTO> {
    return this.http.get<AllUsersDTO>(environment.apiHost + "/driver/all");
  } 

  getVehicleById(driverId: number){
    return this.http.get<any>(environment.apiHost + '/driver/' + driverId + "/vehicle");
  }

  getActiveVehicles(): Observable<any[]> {
    return this.http.get<any[]>(environment.apiHost + "/driver/active-vehicles");
  }
}

export interface ActiveVehicle {
  vehicleId: number,
  driverId: number,
  currentLocation: LocationNoId,
  status: string

} 