import { DisplayedPanic } from './../admin-home/admin-home.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Panic } from './socket.service';


@Injectable({
  providedIn: 'root',
})
export class PanicService {
    constructor(private http: HttpClient) {}

    public panic = new Subject<DisplayedPanic[]>();
    public panics: DisplayedPanic[] = [];
    public hasNew = new Subject<boolean>();
    
    receivedPanic() {
        return this.panic.asObservable();
    }

    updatePanic(res: DisplayedPanic[]) {
        this.panics = res;
        this.panic.next(res);
    }

    receivedHasNew() {
        return this.hasNew.asObservable();
    }

    updateHasNew(res: boolean) {
        this.hasNew.next(res);
    }
  
}