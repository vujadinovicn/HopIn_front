import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {


    constructor(private http: HttpClient) {}

    addNote(text: String, id: number): Observable<any> {
        const dto: NoteDTO = {
            message: text
        }
        const options: any = {
            responseType: 'json',
          };
          return this.http.post<any>(environment.apiHost + "/user/" + id + "/note", dto, options);
    }
    
    getNotes(id: number) : Observable<AllNotes> {
        return this.http.get<AllNotes>(environment.apiHost + "/user/" + id + "/note");
    }
}

export interface NoteDTO {
    message: String;
}

export interface Note {
    id: number;
    date: String;
    message: String;
    admin: User;
}

export interface AllNotes {
    totalCount: number;
    results: Note[];
}