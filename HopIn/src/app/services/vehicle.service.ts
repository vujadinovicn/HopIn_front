import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  
    constructor(private http: HttpClient) {}

    getById(driverId: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(environment.apiHost + '/driver/' + driverId + '/vehicle');
    }

    update(vehicle: any, driverId: number): Observable<any> {
        const options: any = {
          responseType: 'text',
        };
        return this.http.put<string>(environment.apiHost + '/driver/' + driverId + '/vehicle', vehicle, options);
    }

    add(vehicle: any, driverId: number): Observable<any> {
      const options: any = {
        responseType: 'text',
      };
      return this.http.post<string>(environment.apiHost + '/driver/' + driverId + '/vehicle', vehicle, options);
    }
}

export interface Vehicle{
    _id: number,
    model: string,
    licenseNumber: string,
    passengerSeats: number,
    currentLocation: any,
    babyTransport: boolean,
    petTransport: boolean,
    vehicleType: string
}

export interface VehicleType{
    _id: number,
    name: string,
    pricePerKm: number
}