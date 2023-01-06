import { AuthService } from './../services/auth.service';
import { AccountDetailsService } from './../accountDetailsService/account-details.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  _role: String = '';
  _id: number = 0;
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

  url : String = "../../assets/images/profile-placeholder.png";
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

  constructor(private accountDetailsService: AccountDetailsService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.getUser().subscribe((res) => {
      this._role = res;
      this._id = this.authService.getId();
    })

    if(this._role === 'ROLE_PASSENGER') {
      this.accountDetailsService.getPassenger(this._id).subscribe((res) => {
        this.user = res;
        if (this.user.profilePicture != null)
          this.url = this.user.profilePicture;
      });
    } else if (this._role === 'ROLE_DRIVER') {
      this.accountDetailsService.getDriver(this._id).subscribe((res) => {
        this.driver = res;
        this.fromDriverToPassenger();
        if (this.user.profilePicture != null)
          this.url = this.user.profilePicture;
        if (res.vehicleType == "LUXURY") {
          this.urlVehicleType = "../../assets/vectors/luxuryCar.svg"
          this.isLuxury = true;
        } else if (res.vehicleType == "VAN") {
          this.urlVehicleType = "../../assets/vectors/van.svg"
        } else {
          this.urlVehicleType = "../../assets/vectors/regularCar.svg"
        }
      });
    } else if (this._role === 'ROLE_ADMIN') {
      this.accountDetailsService.getUser(this._id).subscribe((res) => {
        this.user = res;
        if (this.user.profilePicture != null)
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
