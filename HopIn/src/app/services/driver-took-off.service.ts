import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DriverTookOffService {
  private subject = new BehaviorSubject<any>({});

  constructor() {}

  sendDriverId(message: number): void {
    this.subject.next(message);
  }

  recieveDriverId(): Observable<number> {
    return this.subject.asObservable();
  }

}