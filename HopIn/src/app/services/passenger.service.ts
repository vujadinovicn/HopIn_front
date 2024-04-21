import { User } from './user.service';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class PassengerService {

    constructor(private http: HttpClient) {}

    findByEmail(email: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/passenger/email/" + email);
    }

    verifyRegistration(code: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/passenger/activate/" + code);
    }

    resendVerificationMail(code: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/passenger/activate/resend?code=" + code);
    }

    getAll() : Observable<AllUsersDTO> {
        return this.http.get<AllUsersDTO>(environment.apiHost + "/passenger");
    }
}

export interface AllUsersDTO {
    totalCount: number,
    results: User[]
}