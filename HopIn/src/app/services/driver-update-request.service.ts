import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { User } from "./user.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UpdateRequestService {

    constructor(private http: HttpClient, private authService: AuthService) {}

    getAllPending(): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/request/pending');
    }

    getAllPendingDriver(id: number): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/request/' + this.authService.getId() + '/driver/pending');
    }

    getAllProcessedAdmin(): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/request/' +  this.authService.getId() + '/admin/processed');
    }

    getAllProcessedDriver(id: number): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/request/' +  this.authService.getId() + '/driver/processed');
    }
}

export interface DriverAccountUpdateRequest {
    id: number,
    driver: User,
    time: string,
    type: string,
    status: string
}