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

  _role : string = "passenger";

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

  updateDriverPassword(driver: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.put<string>(environment.apiHost + '/driver/2', driver, options);
  }

  registerPassenger(passenger: UserDTO): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.post<User>(environment.apiHost + "/passenger", passenger, options);
  }

  updatePassengerPersonalInfo(passenger: any): Observable<any> {
    const options: any = {
      responseType: 'json',
    };
    return this.http.put<string>(environment.apiHost + '/passenger/' + passenger.id, passenger, options);
  }

  updatePassengerPassword(passenger: any): Observable<any> {
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
  
export interface UserDTO {
    name: string;
    surname: string;
    profilePicture: string | null;
    telephoneNumber: string;
    email: string;
    address: string;
    password: string;
}