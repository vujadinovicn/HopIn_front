import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  option: string = "password";

  constructor() { }

  ngOnInit(): void {
  }

  selectOption(o: string){
    this.option = o;
    console.log(this.option);
  }

}
