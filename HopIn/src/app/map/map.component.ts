/// <reference types="@types/google.maps" />
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map : google.maps.Map = {} as google.maps.Map;
  pickup : google.maps.Marker = {} as google.maps.Marker;
  destination : google.maps.Marker = {} as google.maps.Marker;

  constructor() { }

  ngOnInit(): void {
    this.initMap();
    this.addMarker(45.26247360000001, 19.8375849, 'Pickup');
    this.addMarker(
      45.2429669, 19.8531783, 'Destination');
  }



  initMap(): void {
    this.map = new google.maps.Map(
      document.getElementById("map") as HTMLElement,
      {
        center: { lat: 45.236141, lng: 19.8367209 },
        zoom: 13,
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
    let marker = new google.maps.Marker({
      map,
      draggable: true,
      position: { lat: lat, lng: lng},
      title: title
    })

    if (title == 'Pickup')
      this.pickup = marker;
    else 
      this.destination = marker;
      
  }

}
