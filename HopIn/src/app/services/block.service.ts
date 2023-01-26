import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AllUsersDTO } from './passenger.service';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class BlockService {

    private user = new BehaviorSubject<any>({});
    private isSelected = new BehaviorSubject<any>({});


    constructor(private http: HttpClient) {}

    getUser(): Observable<any> {
        return this.user.asObservable();
    }

    setUser(user: any): void {
        this.user.next(user);
    }

    getIsSelected(): Observable<any> {
        return this.isSelected.asObservable();
    }

    setIsSelected(isSel: any): void {
        this.isSelected.next(isSel);
    }

    block(id: number): Observable<string> {
        const options: any = {
            responseType: 'json',
          };
        return this.http.put<string>(environment.apiHost + '/user/' + id +'/block', options);
    }

    unblock(id: number): Observable<string> {
        const options: any = {
            responseType: 'json',
          };
        return this.http.put<string>(environment.apiHost + '/user/' + id +'/unblock', options);
    }
   
}