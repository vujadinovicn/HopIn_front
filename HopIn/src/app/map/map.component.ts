import { Route, ShortAddress } from './../services/routing.service';
/// <reference types="@types/google.maps" />

import { RoutingService } from './../services/routing.service';
import { Component, OnDestroy, OnInit, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { MapService } from '../services/map.service';
import { LocationWithVehicleId, VehiclesMapService } from '../services/vehicles-map.service';
import { RideSocketService } from '../services/ride-socket.service';
import { Vehicle } from '../services/vehicle.service';
import { ColorService } from '../shared/color.service';
import { RideReturnedDTO, RideService } from '../services/ride.service';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  @Input() currentRideStarted: boolean = false;

  route: Route = {} as Route;

  map : google.maps.Map = {} as google.maps.Map;

  currentRideVehicleMarker: any = {};
  currentRideVehicle: any = {};
  currentRide: RideReturnedDTO = {} as RideReturnedDTO;

  directionsService: google.maps.DirectionsService = {} as google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer = {} as google.maps.DirectionsRenderer;

  sub: Subscription = new Subscription();

  constructor(private routingService: RoutingService, 
    private mapService: MapService,
    private rideService: RideService,
    private driverService: DriverService, 
    private vehiclesMapService: VehiclesMapService,
    private rideSocketService: RideSocketService,
    private colorService: ColorService) {
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
    this.configureSockets();

    this.currentRide = this.rideService.ride$.value!;
    console.log(this.currentRide);
    this.setCurrentRideVehicleAndMarker();
  }

  private configureSockets() {
    this.openWebSocketConnections();
    this.updateVehicleLocation();
    this.notifyVehicleArrivalAtDeparture();
  }

  private openWebSocketConnections() {
    this.vehiclesMapService.openWebSocketConnection();
    this.rideSocketService.openWebSocketConnection();
  }

  private updateVehicleLocation() {
    this.vehiclesMapService.receivedLocationChange().subscribe((res: any) => {
      this.changeVehicleMarkerLocation(res);
    });
  }

  private notifyVehicleArrivalAtDeparture(){
    this.vehiclesMapService.recievedVehicleArrivedAtDeparture().subscribe((res: any) => {
      if (this.currentRide.id == res){
      }
    })
  }

  private setCurrentRideVehicleAndMarker() {
    this.driverService.getVehicleById(this.currentRide.driver.id).subscribe((vehicle: Vehicle) => {
      let map = this.map;
      this.currentRideVehicle = vehicle;
      console.log(this.currentRideVehicle);
      this.currentRideVehicleMarker = new google.maps.Marker({
        map,
        position: this.getVehiclePosition(vehicle),
        title: "Vehicle no." + vehicle.id,
        icon: this.getIcon(this.colorService.green)
      });

      let vehiclePos: ShortAddress = {
        address: vehicle.currentLocation?.address!,
        latitude: vehicle.currentLocation?.latitude!,
        longitude: vehicle.currentLocation?.longitude!
      }

      if (!this.currentRideStarted)
        this.routingService.drawRoute(vehiclePos, this.currentRide.locations[0].departure, this.map, this.colorService.orange, true);
      this.routingService.drawRoute(this.currentRide.locations[0].departure, this.currentRide.locations[0].destination, this.map, this.colorService.blue, false);
    });
  }

  changeVehicleMarkerLocation(newLocation: LocationWithVehicleId): void {
    var lastPosn = this.currentRideVehicleMarker.getPosition();
    this.currentRideVehicleMarker.setPosition({ lat: newLocation.latitude, lng: newLocation.longitude});
    var heading = google.maps.geometry.spherical.computeHeading(lastPosn, { lat: newLocation.latitude, lng: newLocation.longitude} );
    this.currentRideVehicleMarker.icon.rotation = heading;
    this.currentRideVehicleMarker.setIcon(this.currentRideVehicleMarker.icon);
  }

  private getIcon(color: string) {
    var car = "M17.402,0H5.643C2.526,0,0,3.467,0,6.584v34.804c0,3.116,2.526,5.644,5.643,5.644h11.759c3.116,0,5.644-2.527,5.644-5.644 V6.584C23.044,3.467,20.518,0,17.402,0z M22.057,14.188v11.665l-2.729,0.351v-4.806L22.057,14.188z M20.625,10.773 c-1.016,3.9-2.219,8.51-2.219,8.51H4.638l-2.222-8.51C2.417,10.773,11.3,7.755,20.625,10.773z M3.748,21.713v4.492l-2.73-0.349 V14.502L3.748,21.713z M1.018,37.938V27.579l2.73,0.343v8.196L1.018,37.938z M2.575,40.882l2.218-3.336h13.771l2.219,3.336H2.575z M19.328,35.805v-7.872l2.729-0.355v10.048L19.328,35.805z";
    var icon = {
      path: car,
      scale: 0.7,
      strokeColor: 'red',
      strokeWeight: .10,
      fillOpacity: 1,
      fillColor: color,
      offset: '5%',
      anchor: new google.maps.Point(10, 25) // orig 10,50 back of car, 10,0 front of car, 10,25 center of car
    };
    return icon;
  }

  private getVehiclePosition(vehicle: any) {
    let latitude = vehicle.currentLocation?.latitude;
    let longitude = vehicle.currentLocation?.longitude;
    return { lat: latitude, lng: longitude };
  }

  private changeMarkerColor(vehicle: Vehicle, color: string) {
    this.currentRideVehicleMarker.icon.fillColor = color;
    this.currentRideVehicleMarker.setIcon(this.currentRideVehicleMarker.icon);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.unsubscribeFromVehiclesMapServiceSockets();
  }

  private unsubscribeFromVehiclesMapServiceSockets() {
    this.vehiclesMapService.unsubscribeFromLocationChange();
    this.vehiclesMapService.unsubscribeFromVehicleArrivedAtDeparture();
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




