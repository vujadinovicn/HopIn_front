import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vehicle-preferences-form',
  templateUrl: './vehicle-preferences-form.component.html',
  styleUrls: ['./vehicle-preferences-form.component.css']
})
export class VehiclePreferencesFormComponent implements OnInit {

  vehicleType : string = "car";
  isBabyTransport : boolean = false;
  isPetTransport: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType.toLowerCase();
  }

}
