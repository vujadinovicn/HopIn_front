import { MapService } from './../services/map.service';
import { PickupDestinationService } from './../services/pickup-destination.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { ShortAddress } from '../services/routing.service';
import { Panic, SocketService } from '../services/socket.service';
import { LocationNoId, Vehicle, VehicleService } from '../services/vehicle.service';
import { LocationWithVehicleId, VehiclesMapService } from '../services/vehicles-map.service';
import { DriverService } from '../services/driver.service';
import { L } from 'chart.js/dist/chunks/helpers.core';
import { RideSocketService } from '../services/ride-socket.service';
import { RideService } from '../services/ride.service';
import { ColorService } from '../shared/color.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'vehicles-map',
  templateUrl: './vehicles-map.component.html',
  styleUrls: ['./vehicles-map.component.css']
})
export class VehiclesMapComponent implements OnInit, OnDestroy {
  
  map : google.maps.Map = {} as google.maps.Map;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;
  currentMarker: string = "Pickup";

  vehicleMarkers: any = {};
  vehicles: any = {};

  constructor(private pickupDestinationService: PickupDestinationService,
              private mapService: MapService,
              private colorService: ColorService,
              private driverService: DriverService, 
              private vehiclesMapService: VehiclesMapService,
              private rideService: RideService,
              private rideSocketService: RideSocketService,
              private socketService: SocketService,
              private authService: AuthService) { }
  
  ngOnInit(): void {
    this.mapService.getLoader().load().then(() => {
      this.initMap();
      this.configureMap(); 
    });  
    this.configureSockets();
    this.setMarkersForActiveVehiclesOnInit();   
    if (this.authService.getRole() == "ROLE_ADMIN") {
      this.recievePanics();
    }
  }

  private configureSockets() {
    this.openWebSocketConnections();
    this.recieveRideSocketServiceSockets();
    this.recieveVehiclesMapServiceSockets();
  }

  private openWebSocketConnections() {
    this.vehiclesMapService.openWebSocketConnection();
    this.rideSocketService.openWebSocketConnection();
  }

  recieveRideSocketServiceSockets(){
    this.rideSocketService.receivedRidePending().subscribe((driverId: any) => {
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        this.changeMarkerColor(vehicle, this.colorService.orange);
      })
    })

    this.rideSocketService.receivedRideAccepted().subscribe((driverId: any) => {
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        this.changeMarkerColor(vehicle, this.colorService.red);
      })
    })

    this.rideSocketService.receivedRideCanceled().subscribe((driverId: any) => {
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        this.changeMarkerColor(vehicle, this.colorService.green);
      })
    })

    this.rideSocketService.receivedRideFinished().subscribe((driverId: any) => {
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        if (this.vehicleMarkers[vehicle.id].icon == "../../assets/vectors/alert-circle.svg"){
          this.vehicleMarkers[vehicle.id].icon = this.getIcon(this.colorService.green);
          this.vehicleMarkers[vehicle.id].setIcon(this.vehicleMarkers[vehicle.id].icon);
        } else {
          this.changeMarkerColor(vehicle, this.colorService.green);
        }
      })
    })
  }

  private recieveVehiclesMapServiceSockets() {
    this.updateVehicleLocation();
    this.setMarkerForActivatedVehicle();
    this.deleteMarkerForDeactivatedVehicle();
  }

  private updateVehicleLocation() {
    this.vehiclesMapService.receivedLocationChange().subscribe((res: any) => {
      this.changeVehicleMarkerLocation(res);
    });
  }

  private setMarkerForActivatedVehicle() {
    this.vehiclesMapService.recievedVehicleActivation().subscribe((driverId: any) => {
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        let map = this.map;
        this.vehicles[vehicle.id] = vehicle;
        this.vehicleMarkers[vehicle.id] = new google.maps.Marker({
          map,
          position: this.getVehiclePosition(vehicle),
          title: "Vehicle no." + vehicle.id,
          icon: this.getIcon(this.colorService.green)
        });
      });
    });
  }

  private deleteMarkerForDeactivatedVehicle() {
    this.vehiclesMapService.recievedVehicleDeactivation().subscribe((driverId: any) => {
      console.log(driverId);
      this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
        delete this.vehicles[vehicle.id];
        this.vehicleMarkers[vehicle.id].setMap(null);
        delete this.vehicleMarkers[vehicle.id];
      });
    });
  }

  private setMarkersForActiveVehiclesOnInit() {
    this.driverService.getActiveVehicles().subscribe((activeVehicles: any) => {
      for (let vehicle of activeVehicles) {
        let map = this.map;
        this.vehicles[vehicle.vehicleId] = vehicle;
        this.vehicleMarkers[vehicle.vehicleId] = new google.maps.Marker({
          map,
          position: this.getVehiclePosition(vehicle),
          title: "Vehicle no." + vehicle.vehicleId,
          icon: this.getIcon(this.getColorOfVehicleAccordingToStatus(vehicle.status))
        });
      }
    });
  }

  recievePanics(){
    this.socketService.receivedPanic().subscribe((res: Panic) => {
      let rideId  = res.ride.id;
      this.rideService.getRideById(rideId).subscribe((res: any) => {
        let driverId = res.driver.id;
        this.driverService.getVehicleById(driverId).subscribe((vehicle: Vehicle) => {
          // let map = this.map;
          this.vehicleMarkers[vehicle.id].icon = "../../assets/vectors/alert-circle.svg";
          this.vehicleMarkers[vehicle.id].setIcon(this.vehicleMarkers[vehicle.id].icon);
      })
  })
  })
}

  ngOnDestroy(): void {
    this.unsubscribeFromVehiclesMapSockets();
    this.unsubscribeFromRideSockets();
  }


  private unsubscribeFromVehiclesMapSockets() {
    this.vehiclesMapService.unsubscribeFromLocationChange();
    this.vehiclesMapService.unsubscribeFromVehicleActivation();
    this.vehiclesMapService.unsubscribeFromVehicleDeactivation();
  }

  private unsubscribeFromRideSockets() {
    this.rideSocketService.unsubscribeFromRideAccepted();
    this.rideSocketService.unsubscribeFromRideCanceled();
    this.rideSocketService.unsubscribeFromRideFinished();
    this.rideSocketService.unsubscribeFromRidePending();
  }

  private getColorOfVehicleAccordingToStatus(status: string): string{
    if (status == "normal")
      return this.colorService.green;
    else if (status == "active")
      return this.colorService.red;
    return this.colorService.orange;
  }

  private changeMarkerColor(vehicle: Vehicle, color: string) {
    this.vehicleMarkers[vehicle.id].icon.fillColor = color;
    this.vehicleMarkers[vehicle.id].setIcon(this.vehicleMarkers[vehicle.id].icon);
  }

  private getVehiclePosition(vehicle: any) {
    let latitude = vehicle.currentLocation?.latitude;
    let longitude = vehicle.currentLocation?.longitude;
    return { lat: latitude, lng: longitude };
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

  changeVehicleMarkerLocation(newLocation: LocationWithVehicleId): void {
    var lastPosn = this.vehicleMarkers[newLocation.vehicleId].getPosition();
    this.vehicleMarkers[newLocation.vehicleId].setPosition({ lat: newLocation.latitude, lng: newLocation.longitude});
    var heading = google.maps.geometry.spherical.computeHeading(lastPosn, { lat: newLocation.latitude, lng: newLocation.longitude} );
    this.vehicleMarkers[newLocation.vehicleId].icon.rotation = heading;
    this.vehicleMarkers[newLocation.vehicleId].setIcon(this.vehicleMarkers[newLocation.vehicleId].icon);
  }

  initMap() {
    this.map = new google.maps.Map(
      document.getElementById("vehicles-map") as HTMLElement,
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
  

  configureMap(): void {
    this.map.addListener("click", (event: any) => {
      console.log(event);
      this.addMarker(event.latLng.lat(), event.latLng.lng(), this.currentMarker);
      this.decodeCoordinates(event.latLng, this.currentMarker);
      if (this.notBothMarkersAdded())
        this.updateCurrentMarker();
    });
  }

  private notBothMarkersAdded() {
    return Object.keys(this.pickup).length == 0 || Object.keys(this.destination).length == 0;
  }

  decodeCoordinates(location: LatLng, type: string) {
    let request: google.maps.GeocoderRequest = {
      location: location
    };
    console.log(type);
    this.geocoder.geocode(request, (response, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        let chosenResponse = response?.at(0);
        let address: ShortAddress = {
          address: chosenResponse?.formatted_address!,
          latitude: chosenResponse?.geometry.location.lat()!,
          longitude: chosenResponse?.geometry.location.lng()!
        }
        if (type == "Pickup") {
          this.pickupDestinationService.updatePickup(address);
        } else {
          if (type == "Destination") {
            this.pickupDestinationService.updateDestination(address);
          } else
            alert("Type must be either 'Destination' or 'Pickup'");
        }
          
        
        } else {
        alert("Sorry, we are not able to decode the chosen coordinates :(");
      } 
    });
  }

  public addMarker(lat: number, lng: number, title: string) {

    if (this.authService.getRole() != 'ROLE_PASSENGER')
      return;

    let map = this.map;

    if (title == 'Pickup') {
      if (Object.keys(this.pickup).length == 0) {
        this.pickup = new google.maps.Marker({
          map,
          position: { lat: lat, lng: lng},
          title: title,
          draggable: true,
          label: {text: "A", color: "white", fontWeight: "bold"},
        });

        this.pickup.addListener('dragend', () => {
          this.decodeCoordinates(this.pickup.getPosition()!, "Pickup");
        });

        this.pickup.addListener('click', () => {
          if (!this.notBothMarkersAdded()) {
            this.pickup.setLabel({text: "A", color: "#337D98", fontWeight: "bold"});
            this.destination.setLabel({text: "B", color: "white", fontWeight: "bold"});
            this.currentMarker = "Pickup";
          }
        });
      }
      else
        this.pickup.setPosition({lat: lat, lng: lng});

    } else {

      if (Object.keys(this.destination).length == 0) {
        this.destination = new google.maps.Marker({
          map,
          position: { lat: lat, lng: lng},
          title: title,
          draggable: true,
          label: {text: "B", color: "white", fontWeight: "bold"},
        });

        this.destination.addListener('dragend', () => {
          this.decodeCoordinates(this.destination.getPosition()!, "Destination");
        });

        this.destination.addListener('click', () => {
          if (!this.notBothMarkersAdded()) {
            this.pickup.setLabel({text: "A", color: "white", fontWeight: "bold"});
            this.destination.setLabel({text: "B", color: "#337D98", fontWeight: "bold"});
            this.currentMarker = "Destination";
          }
        });
      }
      else
        this.destination.setPosition({lat: lat, lng: lng});
    }
  }

  private updateCurrentMarker() {
    this.currentMarker == "Pickup"? this.currentMarker = "Destination": this.currentMarker = "Pickup";
  }

  public removeMarkers() {
    this.pickup.setMap(null);
    this.destination.setMap(null);
  }
}
