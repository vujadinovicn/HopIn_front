import { RidePassenger } from './routing.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Location } from '../favourite-routes/favourite-routes.component';

@Injectable({
  providedIn: 'root'
})
export class RideService {
  constructor(private http: HttpClient) {}

  ride$ = new BehaviorSubject(null);
  rideState$ = this.ride$.asObservable();

  getRide(): Observable<any> {
    return this.ride$;
  }

  setRide(ride: any): void {
    this.ride$.next(ride);
  }

  getAllPassengerRides(id: number): Observable<AllRidesDTO> {
    return this.http.get<AllRidesDTO>(environment.apiHost + '/passenger/' + id + '/all/rides');
  }

  getAllDriverRides(id: number): Observable<AllRidesDTO> {
    return this.http.get<AllRidesDTO>(environment.apiHost + '/driver/' + id + '/all/rides');
  }
}

export interface AllRidesDTO {
    totalCount: number,
    results: RideReturnedDTO[]
}

export interface RideReturnedDTO {
    id: number,
    startTime: String,
    endTime: String,
    totalCost: number,
    driver: RidePassenger,
    passengers: RidePassenger[],
    estimatedTimeInMinutes: number,
    vehicleType: String,
    babyTransport: boolean,
    petTransport: boolean,
    rejection: RejectionNotice,
    locations: LocationDTO[],
    distance: number,
    scheduledTime: String
}

export interface RejectionNotice {
    id: number,
    reason: String,
    timeOfRejection: String
}

export interface LocationDTO {
    departure: Location,
    destination: Location
}

