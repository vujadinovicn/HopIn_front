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

    verifyRegistration(code: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/passenger/verify?code=" + code);
    }

    resendVerificationMail(email: string) : Observable<any> {
        return this.http.get<any>(environment.apiHost + "/passenger/activate/resend?email=" + email);
    }
}