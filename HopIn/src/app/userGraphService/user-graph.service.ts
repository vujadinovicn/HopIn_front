import { Dayjs } from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class UserGraphService {

  constructor(private http: HttpClient) {}

  getAllForDriver(from: Dayjs, to:Dayjs, id: number): Observable<RideForReport[]> {
    return this.http.get<RideForReport[]>(environment.apiHost + '/driver/' + id + '/ride/date?from=' +
    from.format('YYYY/MM/DD') + '&to=' + to.format('YYYY/MM/DD'));
  }

  getAllForPassenger(from: Dayjs, to:Dayjs, id: number): Observable<RideForReport[]> {    
    return this.http.get<RideForReport[]>(environment.apiHost + '/passenger/' + id + '/ride/date?from=' +
    from.format('YYYY/MM/DD') + '&to=' + to.format('YYYY/MM/DD'));
  }

  getAll(from: Dayjs, to:Dayjs): Observable<RideForReport[]> {    
    return this.http.get<RideForReport[]>(environment.apiHost + '/ride/date?from=' +
    from.format('YYYY/MM/DD') + '&to=' + to.format('YYYY/MM/DD'));
  }

}

export interface RideForReport {
  startTime: Date;
  endTime:Date;
  distance: number
  estimatedTimeInMinutes: number;
  totalCost: number;
}

