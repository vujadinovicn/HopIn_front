import { RoutingService, ShortAddress } from './../services/routing.service';
import { RideReturnedDTO, RideService } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ride-history-details',
  templateUrl: './ride-history-details.component.html',
  styleUrls: ['./ride-history-details.component.css']
})
export class RideHistoryDetailsComponent implements OnInit {

  ride!: RideReturnedDTO

  constructor(private rideService: RideService,
    private routingService: RoutingService) { }

  ngOnInit(): void {
    // this.rideService.getRide().subscribe((res) => {
    //   this.ride = res;
    // });
  }

}
