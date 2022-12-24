import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { LatLng } from 'ngx-google-places-autocomplete/objects/latLng';

@Component({
  selector: 'vehicles-map',
  templateUrl: './vehicles-map.component.html',
  styleUrls: ['./vehicles-map.component.css']
})
export class VehiclesMapComponent implements OnInit {
  
  map : google.maps.Map = {} as google.maps.Map;
  geocoder: google.maps.Geocoder = {} as google.maps.Geocoder;

  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;
  currentMarker: string = "Pickup";

  constructor() { }

  ngOnInit(): void {
    let loader = new Loader({
      apiKey: 'AIzaSyADf7wmEupGmb08OGVJR1eNhvtvF6KYuiM&libraries=places&language=en'
    });
    
    loader.load().then(() => {
      this.initMap();
    });
  }

  initMap(): void {
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

    this.geocoder = new google.maps.Geocoder();

    this.map.addListener("click", (event: any) => {
      console.log(event);
      this.addMarker(event.latLng.lat(), event.latLng.lng(), this.currentMarker);
      this.decodeCoordinates(event.latLng);
      this.updateCurrentMarker();
    });
  }

  decodeCoordinates(location: LatLng) {
    let request: google.maps.GeocoderRequest = {
      location: location
    };

    this.geocoder.geocode(request, (response, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        console.log(response?.at(0));
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
          label: {text: "A", color: "white"}
        });

        this.pickup.addListener('dragend', () => {
          this.decodeCoordinates(this.pickup.getPosition()!);
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
          label: {text: "B", color: "white"}
        });

        this.destination.addListener('dragend', () => {
          this.decodeCoordinates(this.destination.getPosition()!);
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
