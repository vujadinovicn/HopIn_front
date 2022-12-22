import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vehicle, VehicleService } from '../services/vehicle.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { modelRegexValidator, platesRegexValidator, seatsRegexValidator } from '../validators/vehicleValidator';

@Component({
  selector: 'app-change-vehicle-info',
  templateUrl: './change-vehicle-info.component.html',
  styleUrls: ['./change-vehicle-info.component.css']
})
export class ChangeVehicleInfoComponent implements OnInit {

  vehicle : Vehicle = {
    _id : 0,
    model: "",
    licenseNumber: "",
    currentLocation: null,
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false,
    vehicleType: ""
  }

  vehicleType : string = "car";
  isBabyTransport : boolean = false;
  isPetTransport: boolean = false;

  vehicleInfoForm = new FormGroup({
    model: new FormControl('', [Validators.required, modelRegexValidator]),
    plates: new FormControl('', [Validators.required, platesRegexValidator]),
    seats: new FormControl('', [Validators.required, seatsRegexValidator]),
  }, [])

  constructor(private vehicleService: VehicleService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.vehicleInfoForm);
    this.setVehicleData();
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType.toLowerCase();
  }

  save() : void {}

  setVehicleData() {
    this.vehicleService.getById(2).subscribe((res: any) => {
      this.vehicle = res;
      this.vehicleInfoForm.setValue({
        model: res.model,
        plates: res.licenseNumber,
        seats: res.passengerSeats
      })
      this.isBabyTransport = res.babyTransport;
      this.isPetTransport = res.petTransport;
      this.changeVehicleType(res.vehicleType);
      console.log(res);
    });;
    
  }
}
