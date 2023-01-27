import { AuthService } from './../services/auth.service';
import { RatingsCardComponent } from './../ratings-card/ratings-card.component';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit {

  ride: RideReturnedDTO = {} as RideReturnedDTO;
  role: string;

  constructor(private rideService: RideService,
              public authService: AuthService) {
    this.role = authService.getRole();              
  }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((ride) => {
      this.ride = ride;
    });
  }

}
