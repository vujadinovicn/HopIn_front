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
    this.selectOption(this.option);
  }

  selectOption(option: string){
    this.option = option;
    this.sendSelectedOption(option);
  }

  sendSelectedOption(option: string): void {
    this.passengerAccountOptionsService.sendSelectedOption(option);
  }
}
