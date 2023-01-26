import { Driver, User, UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { RideReturnedDTO, RideService } from '../services/ride.service';

@Component({
  selector: 'app-driver-info-card',
  templateUrl: './driver-info-card.component.html',
  styleUrls: ['./driver-info-card.component.css']
})
export class DriverInfoCardComponent implements OnInit {

  ride!: RideReturnedDTO;
  driver!: Driver;
  url : String = "../../assets/images/profile-placeholder.png";

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor(private rideService: RideService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      this.userService.getByDriverId(res.driver.id).subscribe((d) => {
        this.driver = d;
        if (d.profilePicture != null) {this.url = d.profilePicture;}
      })
    });
  }

}
