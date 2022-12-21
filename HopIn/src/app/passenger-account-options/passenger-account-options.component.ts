import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
 
@Component({
  selector: 'app-passenger-account-options',
  templateUrl: './passenger-account-options.component.html',
  styleUrls: ['./passenger-account-options.component.css']
})
export class PassengerAccountOptionsComponent implements OnInit {

  constructor(private router: Router, private passengerAccountOptionsService : PassengerAccountOptionsService) { }

  option : string = "settings";

  ngOnInit(): void {
    //this.recieveColorChange();
  }

  selectOption(option: string){
    this.option = option;
  }

  // recieveColorChange(): void {
  //   this.passengerAccountOptionsService.recieveColorChange().subscribe((res: any) => {
  //     this.colors = res;
  //   });
  // }
}
