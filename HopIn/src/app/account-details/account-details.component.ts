import { AccountDetailsService } from './../accountDetailsService/account-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  isDriver: boolean = true;
  user: ReturnedUser = {
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
    this.accountDetailsService.getUser(this.isDriver).subscribe((res) => {
      this.user = res;
      this.url = this.user.profilePicture;
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
