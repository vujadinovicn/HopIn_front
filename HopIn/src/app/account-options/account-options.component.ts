import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { UserService } from '../services/user.service';
 
@Component({
  selector: 'app-account-options',
  templateUrl: './account-options.component.html',
  styleUrls: ['./account-options.component.css']
})
export class AccountOptionsComponent implements OnInit {

  constructor(private router: Router, 
    private authService: AuthService,
    private passengerAccountOptionsService : PassengerAccountOptionsService) { }

  option : string = "settings";
  role: string = "passenger";

  ngOnInit(): void {
    this.selectOption(this.option);
    this.authService.getUser().subscribe((res) => {
      this.role = res;
    })
  }

  selectOption(option: string){
    this.option = option;
    this.sendSelectedOption(option);
  }

  sendSelectedOption(option: string): void {
    this.passengerAccountOptionsService.sendSelectedOption(option);
  }
}
