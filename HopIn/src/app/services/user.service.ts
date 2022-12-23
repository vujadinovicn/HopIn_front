import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  _role : string = "driver";

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }

  get role(): string {
    return this._role;
  }

  set role(r : string){
    this._role = r;
  }


  getByPassengerId(passengerId: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + '/passenger/' + passengerId);
  }

  getByDriverId(driverId: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + '/driver/' + driverId);
  }

  updateDriverPersonalInfo(driver: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.put<string>(environment.apiHost + '/driver/2', driver, options);
  }

  updatePassengerPersonalInfo(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.put<string>(environment.apiHost + '/passenger/1', passenger, options);
  }

  updatePassword(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'text',
    };
    return this.http.put<string>(environment.apiHost + '/passenger/1', passenger, options);
  }
}

export interface User {
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
    telephoneNumber: string;
    email: string;
    address: string;
    password: string;
    newPassword: string;
  }
  