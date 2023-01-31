import { LocationNoId } from './vehicle.service';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { RideReturnedDTO} from './ride.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { UnregisteredRideSuggestionDTO, RouteService} from './route.service';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private subject = new Subject<Route>();

  public isFromHistory: boolean = false;
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
        console.log(response);
        console.log(response?.routes[0].legs[0].steps);
        this.route.distanceFormatted = response?.routes[0].legs[0].distance?.text!;
        this.route.distance= response?.routes[0].legs[0].distance?.value!;
        this.route.durationFormatted = response?.routes[0].legs[0].duration?.text!;
        this.route.duration = response?.routes[0].legs[0].duration?.value!;
        this.getRoutePrice(response);
    }})  
  }

  drawRoute(pointA: ShortAddress, pointB:ShortAddress, map: google.maps.Map, color: string, noMarkers: boolean) {
    this.directionsService = new google.maps.DirectionsService();

    let request: google.maps.DirectionsRequest = {
      origin: {
        lat: pointA.latitude,
        lng: pointA.longitude
      },
      destination: {
        lat: pointB.latitude,
        lng: pointB.longitude
      },
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService.route(request, (response, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        let directionsRenderer = new google.maps.DirectionsRenderer();
        directionsRenderer.setOptions({
              suppressPolylines: false,
              map: map,
              polylineOptions: {
                strokeColor: color,
                strokeOpacity: 1.0,
                strokeWeight: 5
              },
              suppressMarkers: noMarkers
        });
        console.log("###############################");
        console.log(response);
        console.log("###############################");
        directionsRenderer.setDirections(response);
      }
    });
  }

  // drawRoute(carPosition: LocationNoId, ride: RideReturnedDTO, map: google.maps.Map) {
  //   this.directionsService = new google.maps.DirectionsService();

  //   let stop: google.maps.DirectionsWaypoint = {
  //     location: {lat: ride.locations[0].departure.latitude, lng:ride.locations[0].departure.longitude}
  //   }

  //   let request: google.maps.DirectionsRequest = {
  //     origin: {
  //       lat: carPosition.latitude,
  //       lng: carPosition.longitude
  //     },
  //     destination: {
  //       lat: ride.locations[0].destination.latitude,
  //       lng: ride.locations[0].destination.longitude
  //     },
  //     travelMode: google.maps.TravelMode.DRIVING,
  //     waypoints: [stop]
  //   };

  //   this.directionsService.route(request, (response, status) => {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       let directionsRenderer = new google.maps.DirectionsRenderer();
  //       directionsRenderer.setOptions({
  //             suppressPolylines: false,
  //             map: map
  //       });
  //       directionsRenderer.setDirections(response);
  //     }
  //   });
  // }

  // showSteps(directionResult: any) {
  //   // For each step, place a marker, and add the text to the marker's
  //   // info window. Also attach the marker to an array so we
  //   // can keep track of it and remove it when calculating new
  //   // routes.
  //   var myRoute = directionResult.routes[0].legs[0];
  
  //   for (var i = 0; i < myRoute.steps.length; i++) {
  //       var marker = new google.maps.Marker({
  //         position: myRoute.steps[i].start_point,
  //         map: map
  //       });
  //       attachInstructionText(marker, myRoute.steps[i].instructions);
  //       markerArray[i] = marker;
  //   }
  // }

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

  toRoute(ride: RideReturnedDTO): Route {
    return {
      pickup: ride.locations.at(0)?.departure!,
      destination: ride.locations.at(0)?.destination!,
      scheduledTime: ride.scheduledTime!,
      distance: ride.distance,
      distanceFormatted: ride.distanceFormatted,
      duration: ride.estimatedTimeInMinutes,
      durationFormatted: ride.durationFormatted,
      price: ride.totalCost,
      vehicleTypeName: ride.vehicleType,
      babyTransport: ride.babyTransport,
      petTransport: ride.petTransport,
      passengers: ride.passengers,
      scheduledTimeFormatted: ride.scheduledTimeFormatted
    }
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
  passengers: RidePassenger[],
  scheduledTimeFormatted: string
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