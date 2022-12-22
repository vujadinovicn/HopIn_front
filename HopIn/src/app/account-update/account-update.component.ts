import { Component, OnInit } from '@angular/core';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  option: string = "settings";

  constructor(private passengerAccountOptionsService : PassengerAccountOptionsService) { }

  ngOnInit(): void {
    this.recieveSelectedOption();
  }

  recieveSelectedOption(): void {
    this.passengerAccountOptionsService.recieveSelectedOption().subscribe((res: any) => {
      this.option = res;
    });
  }

}
