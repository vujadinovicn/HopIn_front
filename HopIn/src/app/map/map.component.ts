import { Route } from './../services/routing.service';
/// <reference types="@types/google.maps" />

import { RoutingService } from './../services/routing.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../services/map.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  route: Route = {} as Route;

  map : google.maps.Map = {} as google.maps.Map;

  directionsService: google.maps.DirectionsService = {} as google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer = {} as google.maps.DirectionsRenderer;

  sub: Subscription = new Subscription();

  constructor(private routingService: RoutingService, private mapService: MapService) {
    this.route = routingService.route;
   }

  ngOnInit(): void {
    this.mapService.getLoader().load().then(() => {
      
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.sub.add(this.routingService.receivedResponse().subscribe((response: any) => {
        this.initMap();
        this.drawRoute(response);
      }));
      
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 45.236141, lng: 19.8367209 },
        zoom: 14,
        mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP]
        },
        disableDefaultUI: true,
        scaleControl: true,
        zoomControl: true,
        mapTypeId: 'roadmap',
        fullscreenControl: true,
      }
    );
  }

  

  private drawRoute(response: any) {
    this.directionsRenderer.setOptions({
          suppressPolylines: false,
          map: this.map
    });
    this.directionsRenderer.setDirections(response);
  }

  // directions renderer does this for us
  // private fitMap() {
  //   let bounds = new google.maps.LatLngBounds();
  //   bounds.extend(this.pickup.getPosition()!);
  //   bounds.extend(this.destination.getPosition()!);
  //   this.map.fitBounds(bounds);
  // }

}




