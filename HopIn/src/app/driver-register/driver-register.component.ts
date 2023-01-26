import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentReturned, DocumentService } from '../services/document.service';
import { DriverRegisterService } from '../services/driver-register.service';
import { DriverService } from '../services/driver.service';
import { User } from '../services/user.service';
import { Vehicle, VehicleService } from '../services/vehicle.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  driverId: number = 0;
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
    id : 0,
    model: "",
    licenseNumber: "",
    currentLocation: null,
    passengerSeats: 0,
    babyTransport: false,
    petTransport: false,
    vehicleType: ""
  }

  documents : DocumentReturned[] = [];

  constructor(private driverService: DriverService,
    private vehicleService: VehicleService,
    private documentService: DocumentService,
    private driverRegisterService: DriverRegisterService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.recievePersonalInfo();
    this.recieveVehicleInfo();
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

  changeVehicleInfoFormValidity(childIsFormValid: any) : void {
    this.formsSubmitted = this.formsSubmitted && childIsFormValid;
  }

  changePersonalInfoFormValidity(childIsFormValid: any) : void {
    this.formsSubmitted = this.formsSubmitted && childIsFormValid;
  }

  save() {
    this.formsSubmitted = true;
    this.driverRegisterService.sendFormsSubmitted(this.formsSubmitted);
    if (this.formsSubmitted == true){
      this.registerDriver();
    }
  }

  private registerDriver() {
    this.driverService.add(this.driver).subscribe({
      next: (res: User) => {
        this.driverId = res.id;
        this.addVehicle();
        this.addDocuments();
      },
      error: () => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  private addVehicle() {
    this.vehicleService.add(this.vehicle, this.driverId).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  private addDocuments(){
    for (let document of this.documents){
      this.documentService.add(document, this.driverId).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (error: any) => {
          this.sharedService.openNoResponseSnack();
        }
      });
    }
    this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"
    });
  }
}
