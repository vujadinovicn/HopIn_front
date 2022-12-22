import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { UnregisteredRideSuggestionDTO, RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private subject = new Subject<Route>();

  public route: Route = {} as Route;
  public response = new Subject<any>();

  private directionsService: google.maps.DirectionsService = {} as google.maps.DirectionsService;


  constructor(private routeService: RouteService) { }

  updateRoute(route: Route) {
    this.route = route;
    this.subject.next(route);
  }

  receivedRoute(): Observable<Route> {
    return this.subject.asObservable();
  }

  updateResponse(response: any) {
    this.response.next(response);
  }

  receivedResponse(): Observable<any> {
    return this.response.asObservable();
  }

  findRoute() {
    this.directionsService = new google.maps.DirectionsService();
  
    let request: google.maps.DirectionsRequest = {
      origin: {
        lat: this.route.pickup.lat,
        lng: this.route.pickup.lng
      },
      destination: {
        lat: this.route.destination.lat,
        lng: this.route.destination.lng
      },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response, status) => {

      if (status == google.maps.DirectionsStatus.OK) {
        this.route.distanceFormatted = response?.routes[0].legs[0].distance?.text!;
        this.route.distance= response?.routes[0].legs[0].distance?.value!;
        this.route.durationFormatted = response?.routes[0].legs[0].duration?.text!;
        this.route.duration = response?.routes[0].legs[0].duration?.value!;
        console.log(response);
        this.getRoutePrice(response);
      }
    })

    
    
  }
  getRoutePrice(response: any) {
    let priceDTO : UnregisteredRideSuggestionDTO = {
      vehicleTypeName: this.route.vehicleTypeName,
      distance: Math.floor(this.route.distance/1000)
    }
    this.routeService.getRoutePrice(priceDTO).subscribe((price: number) => {
      this.route.price = price;
      this.updateRoute(this.route);
      this.updateResponse(response);
    });
  }
}

export interface Route {
  pickup: ShortAddress,
  destination: ShortAddress,
  scheduledTime: string,
  distance: number,
  distanceFormatted: string,
  duration: number,
  durationFormatted: string,
  price: number,
  vehicleTypeName: string
}

export interface ShortAddress {
  formatted: String,
  lat: number,
  lng: number
}