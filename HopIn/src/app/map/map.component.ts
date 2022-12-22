import { Route } from './../services/routing.service';
/// <reference types="@types/google.maps" />

import { RoutingService } from './../services/routing.service';
import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Loader } from '@googlemaps/js-api-loader';

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

  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;

  sub: Subscription = new Subscription();

  constructor(private routingService: RoutingService) {
    this.route = routingService.route;
   }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyADf7wmEupGmb08OGVJR1eNhvtvF6KYuiM&libraries=places&language=en'
    });
    
    loader.load().then(() => {
      
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();

      this.sub.add(this.routingService.receivedResponse().subscribe((response: any) => {
        this.initMap();
        this.addMarker(this.route.pickup.lat, this.route.pickup.lng, 'Pickup');
        this.addMarker(this.route.destination.lat, this.route.destination.lng, 'Destination');
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

  private drawRoute(response: any) {
    this.directionsRenderer.setOptions({
          suppressPolylines: false,
          map: this.map
    });
    this.directionsRenderer.setDirections(response);

    // let request: google.maps.DirectionsRequest = {
    //   origin: {
    //     lat: this.pickup.getPosition()?.lat()!,
    //     lng: this.pickup.getPosition()?.lng()!
    //   },
    //   destination: {
    //     lat: this.destination.getPosition()?.lat()!,
    //     lng: this.destination.getPosition()?.lng()!
    //   },
    //   travelMode: google.maps.TravelMode.DRIVING
    // };

    // this.directionsService.route(request, (response, status) => {
    //   this.directionsRenderer.setOptions({
    //     suppressPolylines: false,
    //     map: this.map
    //   })

    //   if (status == google.maps.DirectionsStatus.OK) {
    //     this.directionsRenderer.setDirections(response);
    //     this.route.distanceFormatted = response?.routes[0].legs[0].distance?.text!;
    //     this.route.distance= response?.routes[0].legs[0].distance?.value!;
    //     this.route.durationFormatted = response?.routes[0].legs[0].duration?.text!;
    //     this.route.duration = response?.routes[0].legs[0].duration?.value!;
    //     console.log(response);
    //   }
    // })
  }

  // directions renderer does this for us
  // private fitMap() {
  //   let bounds = new google.maps.LatLngBounds();
  //   bounds.extend(this.pickup.getPosition()!);
  //   bounds.extend(this.destination.getPosition()!);
  //   this.map.fitBounds(bounds);
  // }

}


