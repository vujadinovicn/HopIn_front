import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class RideService {

    constructor(private http: HttpClient) {}

    getAcceptedOrStartedRideForDriver(id: number) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/driver/" + id + "/accepted-started/");
    }

    getPendingRideForDriver(id: number) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/driver/" + id + "/active");
    }
}