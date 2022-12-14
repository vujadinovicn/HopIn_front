import { Component, OnInit } from '@angular/core';
import { AccountDetailsService } from '../account-details.service';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  passenger: ReturnedUser = {
    id: 0,
    name: "",
    surname: "",
    profilePicture: "",
    telephoneNumber: "",
    email: "",
    address: ""
  };

  constructor(private accountDetailsService: AccountDetailsService) { }
  // constructor() { }

  ngOnInit(): void {
    this.accountDetailsService.getUser().subscribe((res) => {
      this.passenger = res;
    });
  }
  // ngOnInit(): void {}
    
  
}

export interface ReturnedUser {
  id: number;
  name: String;
  surname: String;
  profilePicture: String;
  telephoneNumber: String;
  email: String;
  address: String;
}
