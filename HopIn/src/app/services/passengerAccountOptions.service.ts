import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PassengerAccountOptionsService {
  private subject = new BehaviorSubject<any>({});

  constructor() {}

  sendColorChange(message: any): void {
    this.subject.next(message);
  }

  recieveColorChange(): Observable<any> {
    return this.subject.asObservable();
  }

}
