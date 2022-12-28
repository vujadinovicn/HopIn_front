import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { User } from "./user.service";
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UpdateRequestService {

    constructor(private http: HttpClient) {}

    getAllPending(): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/request/pending');
    }

    getAllPendingDriver(): Observable<DriverAccountUpdateRequest[]> {
        return new Observable<DriverAccountUpdateRequest[]>();
    }

    getAllProcessedAdmin(): Observable<DriverAccountUpdateRequest[]> {
        return this.http.get<DriverAccountUpdateRequest[]>(environment.apiHost + '/1/admin/processed');
    }

    getAllProcessedDriver(): Observable<DriverAccountUpdateRequest[]> {
        return new Observable<DriverAccountUpdateRequest[]>();
    }
}

export interface DriverAccountUpdateRequest {
    id: number,
    driver: User,
    time: string,
    type: string,
    status: string
}