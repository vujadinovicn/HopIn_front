import { PassengerAccountOptionsService } from './passengerAccountOptions.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WorkingHoursService {
  constructor(private http: HttpClient) {}

  startCounting(driverId: number): Observable<WorkingHours> {
    const startDto: WorkingHoursStartDTO = {
        start: new Date()
    };
    return this.http.post<WorkingHours>(environment.apiHost + '/driver/' + driverId + '/working-hour', startDto);
  }

  endCounting(workingHoursId: number): Observable<WorkingHours> {
    const endDto: WorkingHoursEndDTO = {
        end: new Date()
    }; 
    return this.http.put<WorkingHours>(environment.apiHost + '/driver/working-hour/' + workingHoursId, endDto);
  }
}

export interface WorkingHours {
    id: number,
    start: string,
    end: string
}

export interface WorkingHoursStartDTO {
    start: Date
}

export interface WorkingHoursEndDTO {
    end: Date
}