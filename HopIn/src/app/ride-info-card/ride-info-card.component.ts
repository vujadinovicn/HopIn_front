import { Component, OnInit } from '@angular/core';
import { RideReturnedDTO, RideService } from '../services/ride.service';

@Component({
  selector: 'ride-info-card',
  templateUrl: './ride-info-card.component.html',
  styleUrls: ['./ride-info-card.component.css']
})
export class RideInfoCardComponent implements OnInit {

  ride!: RideReturnedDTO

  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
    });
  }

}
