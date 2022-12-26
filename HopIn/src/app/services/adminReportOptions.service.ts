import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminReportOptionsService {
  private subject = new BehaviorSubject<any>({});

  constructor() {}

  sendSelectedOption(message: any): void {
    this.subject.next(message);
  }

  recieveSelectedOption(): Observable<any> {
    return this.subject.asObservable();
  }

}