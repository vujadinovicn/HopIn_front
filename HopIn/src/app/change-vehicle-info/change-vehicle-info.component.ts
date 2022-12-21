import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { modelRegexValidator, platesRegexValidator, seatsRegexValidator } from '../validators/vehicleValidator';

@Component({
  selector: 'app-change-vehicle-info',
  templateUrl: './change-vehicle-info.component.html',
  styleUrls: ['./change-vehicle-info.component.css']
})
export class ChangeVehicleInfoComponent implements OnInit {

  vehicleType : string = "car";
  isBabyTransport : boolean = false;
  isPetTransport: boolean = false;

  vehicleInfoForm = new FormGroup({
    model: new FormControl('', [Validators.required, modelRegexValidator]),
    plates: new FormControl('', [Validators.required, platesRegexValidator]),
    seats: new FormControl('', [Validators.required, seatsRegexValidator]),
  }, [])

  constructor() { }

  ngOnInit(): void {
    markFormControlsTouched(this.vehicleInfoForm);
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType;
    console.log(this.vehicleType);
  }

  save() : void {}

}
