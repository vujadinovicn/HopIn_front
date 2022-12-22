import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

    private value$ = new BehaviorSubject<any>({});
    selectedValue$ = this.value$.asObservable();

    constructor(private http: HttpClient) {}

    setValue(test: any) {
        this.value$.next(test);
    }

    getById(driverId: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(environment.apiHost + '/driver/' + driverId + '/vehicle');
    }

    update(vehicle: any): Observable<any> {
        const options: any = {
          responseType: 'text',
        };
        return this.http.put<string>(environment.apiHost + '/driver/2/vehicle', vehicle, options);
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