import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  constructor(private http: HttpClient) {}


  getByPassengerId(passengerId: number): Observable<User> {
    return this.http.get<User>(environment.apiHost + '/passenger/' + passengerId);
  }

  getByDriverId(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(environment.apiHost + '/driver/' + driverId);
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
      responseType: 'json',
    };
    return this.http.put<string>(environment.apiHost + '/passenger/' + passenger.id, passenger, options);
  }

  sendResetPasswordEmail(email: string): Observable<String> {
    return this.http.get<String>(environment.apiHost + "/user/" + email + "/resetPasswordEmail");
  }

  resetPassword(dto: ResetPasswordDTO) {
    return this.http.put<string>(environment.apiHost + "/user/0/resetPassword", dto);
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
    blocked: boolean;
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

export interface MethodsForRole{
  serviceSendToBackMethod: any,
  serviceGetMethod: any,
  routerNavigation: any
}

export class MethodsForRoleImpl implements MethodsForRole {
  serviceSendToBackMethod: any;
  serviceGetMethod: any;
  routerNavigation: any;

  constructor(){}
}
export interface ResetPasswordDTO {
  code: string,
  newPassword: string
}

export interface Driver {
  id: number;
  name: string;
  surname: string;
  profilePicture: string;
  telephoneNumber: string;
  email: string;
  address: string;
  password: string;
  model: string,
  licenseNumber: string,
  vehicleType: string
}
