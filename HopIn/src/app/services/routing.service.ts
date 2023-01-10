import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { UnregisteredRideSuggestionDTO, RouteService } from './route.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private subject = new Subject<Route>();

  public route: Route = {} as Route;
  public response = new BehaviorSubject<any>({});

  private directionsService: google.maps.DirectionsService = {} as google.maps.DirectionsService;
  invite: boolean = false;


  constructor(private routeService: RouteService, private authService: AuthService) { 
    this.route.babyTransport = false;
    this.route.petTransport = false;
    this.route.vehicleTypeName = 'CAR';
  }

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
        lat: this.route.pickup.latitude,
        lng: this.route.pickup.longitude
      },
      destination: {
        lat: this.route.destination.latitude,
        lng: this.route.destination.longitude
      },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response, status) => {

      if (status == google.maps.DirectionsStatus.OK) {
        this.route.distanceFormatted = response?.routes[0].legs[0].distance?.text!;
        this.route.distance= response?.routes[0].legs[0].distance?.value!;
        this.route.durationFormatted = response?.routes[0].legs[0].duration?.text!;
        this.route.duration = response?.routes[0].legs[0].duration?.value!;
        this.getRoutePrice(response);
    }})  
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

  setDefaultUser() {
    this.route.passengers = [{
      id: this.authService.getId(),
      email: this.authService.getEmail()
    }];
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
  vehicleTypeName: string,
  babyTransport: boolean,
  petTransport: boolean,
  passengers: RidePassenger[]
}

export interface ShortAddress {
  address: string,
  latitude: number,
  longitude: number
}

export interface RidePassenger {
  id: number,
  email: string
}