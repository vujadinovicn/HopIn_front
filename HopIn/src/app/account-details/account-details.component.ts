import { AccountDetailsService } from './../accountDetailsService/account-details.service';
import { Component, OnInit } from '@angular/core';

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

  url : String = "../../assets/vectors/login.svg";

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor(private accountDetailsService: AccountDetailsService) { }

  ngOnInit(): void {
    this.accountDetailsService.getUser().subscribe((res) => {
      this.passenger = res;
      this.url = this.passenger.profilePicture;
    });
  }
    
  
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
