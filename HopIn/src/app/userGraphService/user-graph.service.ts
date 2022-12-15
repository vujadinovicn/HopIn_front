import { Dayjs } from 'dayjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const ridesC = [
  {
    startTime: new Date(2022, 12, 10),
    endTime:new Date(),
    distance: 400,
    estimatedTimeInMinutes: 25,
    totalCost: 20
  },
  {
    startTime: new Date(2022, 12, 10),
    endTime:new Date(),
    distance: 400,
    estimatedTimeInMinutes: 10,
    totalCost: 20
  },
  {
    startTime: new Date(2022, 12, 12),
    endTime:new Date(),
    distance: 400,
    estimatedTimeInMinutes: 25,
    totalCost: 20
  },
  {
    startTime: new Date(2022, 12, 13),
    endTime:new Date(),
    distance: 200,
    estimatedTimeInMinutes: 25,
    totalCost: 20
  },
  
]




@Injectable({
  providedIn: 'root'
})
export class UserGraphService {

  private rides: RideForReport[] = []

  constructor(private http: HttpClient) {
    this.rides = ridesC;
   }

  getAll(from: Dayjs, to:Dayjs): Observable<RideForReport[]> {
    return this.http.get<RideForReport[]>('http://localhost:4321/api/passenger/1/ride/date?from=' +
    from.format('YYYY/MM/DD') + '&to=' + to.format('YYYY/MM/DD'));
  }

  getAllMockUp(): RideForReport[] {
    return this.rides;
  }
}

export interface RideForReport {
  startTime: Date;
  endTime:Date;
  distance: number
  estimatedTimeInMinutes: number;
  totalCost: number;
}

