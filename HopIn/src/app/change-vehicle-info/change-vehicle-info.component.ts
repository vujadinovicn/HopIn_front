import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DriverRegisterService } from '../services/driver-register.service';
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

  driverId: number = 0;

  vehicle : Vehicle = {
    id : 0,
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
  @Input() formsSubmitted = false;
  @Output() isFormValid = new EventEmitter<boolean>();

  constructor(private router: Router,
    private authService: AuthService,
    private vehicleService: VehicleService,
    private requestDetailsService: RequestDetailsService,
    private driverRegisterService: DriverRegisterService,
    private sharedService : SharedService) { }

  ngOnInit(): void {
    this.setDriverId();
    this.setBehaviorForParentComponent();
    markFormControlsTouched(this.vehicleInfoForm);
  }

  private setBehaviorForParentComponent() {
    if (this.parentComponent == "update")
      this.setVehicleData();
    else {
        this.driverRegisterService.recieveFormsSubmitted().subscribe((res: any) => {
        this.vehicleInfoForm.markAllAsTouched();
        this.saveDriverRegister();
      }
      );
    }
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType.toLowerCase();
  }

  save() : void {
    this.saveDriverUpdate();
  }

  private saveDriverUpdate() {
    if (this.vehicleInfoForm.valid) {
      this.requestDetailsService.addVehicleRequest(this.driverId, this.setResponseValue()).subscribe({
        next: () => {
          this.router.navigate(['/account-driver']);
          this.sharedService.openResponseSnack();
        },
        error: () => {
          this.sharedService.openNoResponseSnack();
        }
      });
    }
    else
      this.sharedService.openInvalidInputSnack();
  }

  private saveDriverRegister() {
    if (this.vehicleInfoForm.valid) {
      this.driverRegisterService.sendVehicleInfo(this.setResponseValue());
    }
    else { 
      this.sharedService.openInvalidInputSnack(); 
    }
    this.isFormValid.emit(this.vehicleInfoForm.valid);
  }

  private setDriverId() {
    this.authService.getUser().subscribe((res) => {
      this.driverId = this.authService.getId();
    });
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

  private setVehicleData() {
    this.vehicleService.getById(this.driverId).subscribe((res: any) => {
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
