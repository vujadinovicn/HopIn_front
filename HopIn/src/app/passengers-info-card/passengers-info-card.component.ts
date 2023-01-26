import { RideReturnedDTO, RideService } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-passengers-info-card',
  templateUrl: './passengers-info-card.component.html',
  styleUrls: ['./passengers-info-card.component.css']
})
export class PassengersInfoCardComponent implements OnInit {

  ride!: RideReturnedDTO;
  passengers: User[] = [];
  urls: String[] = [];

  constructor(private rideService: RideService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      this.urls = [];
      for (let pass of this.ride.passengers) {
        this.userService.getByPassengerId(pass.id).subscribe((p) => {
          this.passengers.push(p);
          if (p.profilePicture == null) {
            this.urls.push("../../assets/images/profile-placeholder.png");
          } else {
            this.urls.push(p.profilePicture);
          }
        })
      }
    })
  }

}
