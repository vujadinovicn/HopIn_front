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

  getAll(from: Dayjs, to:Dayjs): Observable<RideForReport[]> {
    return this.http.get<RideForReport[]>(environment.apiHost + '/passenger/1/ride/date?from=' +
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

