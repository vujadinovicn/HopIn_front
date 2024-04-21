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

  option : string = "settings";
  userRole: string = "ROLE_PASSENGER";

  constructor(private authService: AuthService,
    private passengerAccountOptionsService : PassengerAccountOptionsService) { }

  ngOnInit(): void {
    this.setRole();
    this.selectOptionIfAdminRole();
    this.selectOption(this.option);
  }

  selectOption(option: string){
    this.option = option;
    this.sendSelectedOption(option);
  }

  selectOptionIfAdminRole(): void {
    if (this.userRole === 'ROLE_ADMIN') {
      this.option = 'allReports'
    } else {
      this.option = 'settings'
    }
  }

  private sendSelectedOption(option: string): void {
    this.passengerAccountOptionsService.sendSelectedOption(option);
  }

  private setRole() {
    this.authService.getUser().subscribe((res) => {
      this.userRole = res;
    })
  }
}
