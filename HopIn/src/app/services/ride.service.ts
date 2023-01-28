import { RidePassenger, ShortAddress } from './routing.service';
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

  public ride$ = new BehaviorSubject(null);
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

  getAcceptedOrStartedRideForDriver(id: number) : Observable<any> {
    return this.http.get<any>(environment.apiHost + "/driver/" + id + "/accepted-started/");
  }

  getPendingRideForDriver(id: number) : Observable<any> {
      return this.http.get<any>(environment.apiHost + "/driver/" + id + "/active");
  }

  acceptRide(rideId: number): Observable<RideReturnedDTO> {
      return this.http.put<any>(environment.apiHost + "/ride/" + rideId + "/accept", null);
  }

  declineRide(rideId: number, reason: ReasonDTO): Observable<RideReturnedDTO> {
    return this.http.put<any>(environment.apiHost + "/ride/" + rideId + "/cancel", reason);
  }

  startRide(rideId: number): Observable<RideReturnedDTO> {
    return this.http.put<any>(environment.apiHost + "/ride/" + rideId + "/start", null);
  }

  endRide(rideId: number): Observable<RideReturnedDTO> {
    return this.http.put<any>(environment.apiHost + "/ride/" + rideId + "/end", null);
  }

  panicRide(rideId: number, reason: ReasonDTO): Observable<RideReturnedDTO> {
    return this.http.put<any>(environment.apiHost + "/ride/" + rideId + "/panic", reason);
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
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    rejection: RejectionNotice,
    locations: LocationDTO[],
    distance: number,
    scheduledTime: string,
    distanceFormatted: string,
    durationFormatted: string,
    status: string
}

export interface RejectionNotice {
    id: number,
    reason: String,
    timeOfRejection: String
}

export interface LocationDTO {
    departure: ShortAddress,
    destination: ShortAddress
}

export interface ReasonDTO {
  reason: string
}