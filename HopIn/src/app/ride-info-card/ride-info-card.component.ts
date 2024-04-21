import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RideReturnedDTO, RideService } from '../services/ride.service';

@Component({
  selector: 'ride-info-card',
  templateUrl: './ride-info-card.component.html',
  styleUrls: ['./ride-info-card.component.css']
})
export class RideInfoCardComponent implements OnInit {

  ride!: RideReturnedDTO
  departure: string = "";
  destination: string = "";

  constructor(private rideService: RideService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
    });
    this.departure = this.parseLocation(this.ride.locations[0].departure.address);
    this.destination = this.parseLocation(this.ride.locations[0].destination.address);
  }

  parseLocation(location: string): string {
    if (!location.includes(','))
      return location;
    return location.split(",")[0]+", "+location.split(",")[1].replace(/[0-9]/g, '');
  }

  parseDate(date: string): string {
    let d = date.split("T")[0];
    let t = date.split("T")[1].split(".")[0]
    return d.split("-")[2] + "-" + d.split("-")[1] + "-" + d.split("-")[0] + " at " + t;
  }

}
