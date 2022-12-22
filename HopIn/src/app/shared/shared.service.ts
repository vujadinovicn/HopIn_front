import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private snackMessage$ = new BehaviorSubject<any>({});
  newSnackMessage$ = this.snackMessage$.asObservable();

  constructor() {}

  openSnack(message: any) {
    this.snackMessage$.next(message);
  }

  openResponseSnack(){
    this.openSnack(
      { value: "Response is in console!",
        color: "back-green"}
    );
  }

  openNoResponseSnack() {
    this.openSnack({
      value: "Haven't got data back!",
      color: "back-dark-blue"}
      );
  }

  openInvalidInputSnack(){
    this.openSnack({
      value: "Check inputs again!",
      color: "back-red"}
      );
  }
}