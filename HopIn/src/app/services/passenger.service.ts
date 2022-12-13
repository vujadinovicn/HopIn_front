import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }

  getById(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(environment.apiHost + 'api/passenger/' + passengerId);
  }

  add(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<string>(environment.apiHost + 'api/passenger/' + passenger.id, passenger, options);
  }
}

export interface Passenger {
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;

  }
  