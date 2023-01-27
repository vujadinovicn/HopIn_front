import { RidePassenger } from './../services/routing.service';
import { AuthService } from './../services/auth.service';
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
    private userService: UserService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      this.urls = [];

      let ridePass: RidePassenger[] = [];

      if (this.authService.getRole() == "ROLE_PASSENGER") {
        ridePass = filterPassengers(this.ride.passengers, this.authService.getId());
      } else {
        ridePass = this.ride.passengers;
      }
      

      for (let pass of ridePass) {
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

export function filterPassengers(passengers: RidePassenger[], currId: number): RidePassenger[] {
  return passengers.filter((pass) => {
    return pass.id != currId;
  })
}

