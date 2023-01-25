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
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      // let pickUp: ShortAddress = {
      //   address: this.ride.locations[0].departure.address.toString(),
      //   longitude: this.ride.locations[0].departure.longitude,
      //   latitude: this.ride.locations[0].departure.latitude
      // }

      // let dest: ShortAddress = {
      //   address: this.ride.locations[0].destination.address.toString(),
      //   longitude: this.ride.locations[0].destination.longitude,
      //   latitude: this.ride.locations[0].destination.latitude
      // }
      // this.routingService.route.pickup = pickUp;
      // this.routingService.route.destination = dest;
      // this.routingService.route.scheduledTime = this.ride.scheduledTime.toString();
      // this.routingService.findRoute();
    });
  }

}
