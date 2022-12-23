import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentsService {
  private value$ = new BehaviorSubject<any>({});
  selectedValue$ = this.value$.asObservable();

  constructor(private http: HttpClient) {}

  setValue(test: any) {
    this.value$.next(test);
  }
  
  getById(driverId: number): Observable<Document[]> {
    return this.http.get<Document[]>(environment.apiHost + 'driver/" + driverId + "/documents/');
  }
}

export interface Document {
    _id: number,
    name: string,
    documentImage: string,
    driverId: number
}