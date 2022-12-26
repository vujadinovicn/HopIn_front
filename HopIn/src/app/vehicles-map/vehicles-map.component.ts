import { MapService } from './../services/map.service';
import { PickupDestinationService } from './../services/pickup-destination.service';
import { Component, OnInit } from '@angular/core';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';
import { ShortAddress } from '../services/routing.service';

@Component({
  selector: 'vehicles-map',
  templateUrl: './vehicles-map.component.html',
  styleUrls: ['./vehicles-map.component.css']
})
export class VehiclesMapComponent implements OnInit {
  
  map : google.maps.Map = {} as google.maps.Map;
  geocoder: google.maps.Geocoder = new google.maps.Geocoder();

  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;
  currentMarker: string = "Pickup";

  constructor(private pickupDestinationService: PickupDestinationService,
              private mapService: MapService) { }

  ngOnInit(): void {
    this.mapService.getLoader().load().then(() => {
      this.initMap();
      this.configureMap();
    }); 
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
          formatted: chosenResponse?.formatted_address!,
          lat: chosenResponse?.geometry.location.lat()!,
          lng: chosenResponse?.geometry.location.lng()!
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
}
