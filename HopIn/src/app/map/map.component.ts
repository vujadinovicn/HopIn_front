/// <reference types="@types/google.maps" />

import { RoutingService } from './../services/routing.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  map : google.maps.Map = {} as google.maps.Map;

  directionsService: google.maps.DirectionsService = new google.maps.DirectionsService();
  directionsRenderer: google.maps.DirectionsRenderer = new google.maps.DirectionsRenderer();

  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;

  sub: Subscription;

  constructor(private routingService: RoutingService) {
    this.sub = this.routingService.receivedRoute().subscribe((route) => {
      this.addMarker(route.pickup.lat, route.pickup.lng, 'Pickup');
      this.addMarker(route.destination.lat, route.destination.lng, 'Destination');
      // this.fitMap();
      this.drawRoute();
    });
   }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
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
        mapTypeId: 'roadmap'
      }
    );
  }

  public addMarker(lat: number, lng: number, title: string) {
    let map = this.map;

    if (title == 'Pickup') {
      if (Object.keys(this.pickup).length == 0)
        this.pickup = new google.maps.Marker({
          map,
          draggable: true,
          position: { lat: lat, lng: lng},
          title: title,
      });
      else
        this.pickup.setPosition({lat: lat, lng: lng});

    } else {
      if (Object.keys(this.destination).length == 0)
        this.destination = new google.maps.Marker({
          map,
          draggable: true,
          position: { lat: lat, lng: lng},
          title: title,
      });
      else
        this.destination.setPosition({lat: lat, lng: lng});
    }
  }

  private drawRoute() {
    let request: google.maps.DirectionsRequest = {
      origin: {
        lat: this.pickup.getPosition()?.lat()!,
        lng: this.pickup.getPosition()?.lng()!
      },
      destination: {
        lat: this.destination.getPosition()?.lat()!,
        lng: this.destination.getPosition()?.lng()!
      },
      travelMode: google.maps.TravelMode.DRIVING
    };

    this.directionsService.route(request, (response, status) => {
      this.directionsRenderer.setOptions({
        suppressPolylines: false,
        map: this.map
      })

      if (status == google.maps.DirectionsStatus.OK) {
        this.directionsRenderer.setDirections(response);
        console.log(response);
      }
    })
  }

  // directions renderer does this for us
  // private fitMap() {
  //   let bounds = new google.maps.LatLngBounds();
  //   bounds.extend(this.pickup.getPosition()!);
  //   bounds.extend(this.destination.getPosition()!);
  //   this.map.fitBounds(bounds);
  // }

}
