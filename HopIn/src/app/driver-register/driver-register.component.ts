import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DriverRegisterService } from '../services/driver-register.service';
import { User } from '../services/user.service';
import { Vehicle } from '../services/vehicle.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  parentComponent = "register";
  formsSubmitted : boolean = false;

  driver : User = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    address: '',
    telephoneNumber: '',
    profilePicture: '',
    password: 'oldPassword',
    newPassword: ''
  }

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

  documents : Document[] = [];

  constructor(private cdr: ChangeDetectorRef,
    private driverRegisterService: DriverRegisterService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  changeFormValidity(childIsFormValid: any) : void {
    this.formsSubmitted = this.formsSubmitted && childIsFormValid;
  }

  changeFormSValidity(childIsFormValid: any) : void {
    this.formsSubmitted = this.formsSubmitted && childIsFormValid;
  }

  recievePersonalInfo(){
    this.driverRegisterService.recievePersonalInfo().subscribe((res: any) => {
      this.driver = res;
    });
  }

  recieveVehicleInfo(){
    this.driverRegisterService.recieveVehicleInfo().subscribe((res: any) => {
      this.vehicle = res;
    });
  }

  recieveDocument(document: any){
    this.documents.push(document);
  }

  save() {
    this.formsSubmitted = true;
    this.driverRegisterService.sendFormsSubmitted(this.formsSubmitted);
    this.recievePersonalInfo();
    this.recieveVehicleInfo();

    if (this.formsSubmitted == true){
      console.log("radi");
    }
  }
}
