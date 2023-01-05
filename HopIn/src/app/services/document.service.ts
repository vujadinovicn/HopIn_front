import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  private selectedDocument = new Subject<any>();
  recievedDocument = this.selectedDocument.asObservable();
  private updatedDocument = new Subject<any>();

  constructor(private http: HttpClient) {}

  selectDocument(documentId : number){
    this.selectedDocument.next(documentId);
  }

  recieveDocument() : Observable<any> {
    return this.recievedDocument;
  }
  
  getById(driverId: number): Observable<Document[]> {
    return this.http.get<Document[]>(environment.apiHost + "/driver/2" + "/documents");
  }

  sendUpdate(updatedDocument: any){
    this.updatedDocument.next(updatedDocument);
  }

  recieveUpdate(): Observable<any>{
    return this.updatedDocument.asObservable();
  }
}

export interface Document {
  id: number,
  name: String,
  documentImage: string,
  driverId: number
}

