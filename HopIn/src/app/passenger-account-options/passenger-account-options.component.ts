import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
 
@Component({
  selector: 'app-passenger-account-options',
  templateUrl: './passenger-account-options.component.html',
  styleUrls: ['./passenger-account-options.component.css']
})
export class PassengerAccountOptionsComponent implements OnInit {

  colors : any = {
    accountSettingsColor : "",
    passwordColor: "",
    paymentInfoColor: ""
  }

  constructor(private router: Router, private passengerAccountOptionsService : PassengerAccountOptionsService) { }

  ngOnInit(): void {
    this.recieveColorChange();
  }

  recieveColorChange(): void {
    this.passengerAccountOptionsService.recieveColorChange().subscribe((res: any) => {
      this.colors = res;
    });
  }
}
