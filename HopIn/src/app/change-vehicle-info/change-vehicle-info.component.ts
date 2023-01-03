import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RequestDetailsService } from '../services/requestDetails.service';
import { Vehicle, VehicleService } from '../services/vehicle.service';
import { SharedService } from '../shared/shared.service';
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

  @Input() parentComponent = '';

  constructor(private router: Router,
    private vehicleService: VehicleService,
    private requestDetailsService: RequestDetailsService,
    private sharedService : SharedService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.vehicleInfoForm);
    this.setVehicleData();
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType.toLowerCase();
  }

  save() : void {
    if (this.vehicleInfoForm.valid) {
      console.log(this.setResponseValue());
      this.requestDetailsService.addVehicleRequest(2, this.setResponseValue()).subscribe({
          next: (res: any) => {
            this.router.navigate(['/account-driver']);
            this.sharedService.openResponseSnack();
          },
          error: (error: any) => {
              this.sharedService.openNoResponseSnack();
          }
        });
    } else
        this.sharedService.openInvalidInputSnack();
  }

  private setResponseValue(): any{
    return {
      vehicleType: this.vehicleType.toUpperCase(),
      model: this.vehicleInfoForm.value.model,
      licenseNumber: this.vehicleInfoForm.value.plates,
      currentLocation: this.vehicle.currentLocation,
      passengerSeats: this.vehicleInfoForm.value.seats,
      babyTransport: this.isBabyTransport,
      petTransport: this.isPetTransport
    }
  }

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
    });;
    
  }
}
