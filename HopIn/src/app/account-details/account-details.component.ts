import { AccountDetailsService } from './../accountDetailsService/account-details.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  _role: String = 'driver';
  isLuxury: boolean = false;
  user: ReturnedUser = {
    id: 0,
    name: "",
    surname: "",
    profilePicture: "",
    telephoneNumber: "",
    email: "",
    address: ""
  };
  driver: ReturnedDriver = {
    id: 0,
    name: "",
    surname: "",
    profilePicture: "",
    telephoneNumber: "",
    email: "",
    address: "",
    model: "",
    licenseNumber: "",
    vehicleType: ""
  };

  url : String = "../../assets/vectors/login.svg";
  urlVehicleType = "../../assets/vectors/regularCar.svg";

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
    if(this._role === 'passenger') {
      this.accountDetailsService.getPassenger().subscribe((res) => {
        this.user = res;
        this.url = this.user.profilePicture;
      });
    } else if (this._role === 'driver') {
      this.accountDetailsService.getDriver().subscribe((res) => {
        this.driver = res;
        this.fromDriverToPassenger();
        this.url = this.user.profilePicture;
        if (res.vehicleType == "LUKSUZNO") {
          this.urlVehicleType = "../../assets/vectors/luxuryCar.svg"
          this.isLuxury = true;
        } else if (res.vehicleType == "KOMBI") {
          this.urlVehicleType = "../../assets/vectors/van.svg"
        } else {
          this.urlVehicleType = "../../assets/vectors/regularCar.svg"
        }
      });
    } else if (this._role === 'admin') {
      this.accountDetailsService.getUser().subscribe((res) => {
        this.user = res;
        this.url = this.user.profilePicture;
      });
    }
  }
  
  fromDriverToPassenger(): void {
    this.user.id = this.driver.id;
    this.user.name = this.driver.name;
    this.user.surname = this.driver.surname;
    this.user.profilePicture = this.driver.profilePicture;
    this.user.telephoneNumber = this.driver.telephoneNumber;
    this.user.email = this.driver.email;
    this.user.address = this.driver.address;
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

export interface ReturnedDriver {
  id: number;
  name: String;
  surname: String;
  profilePicture: String;
  telephoneNumber: String;
  email: String;
  address: String;
  model: String;
  licenseNumber: String; 
  vehicleType: String;
}
