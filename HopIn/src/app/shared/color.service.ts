import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ColorService {

    red: string = "#A8201A";
    darkBlue: string = "#1E4A5A";
    white: string = "#FFFFFF";
    darkGray : string = "#B1B1B1";
    orange : string = "#EC9A29";
    black : string = "#383838";
    green: string = "#33A02C";
    blue: string = "#337D98";
    
    constructor() {}
}