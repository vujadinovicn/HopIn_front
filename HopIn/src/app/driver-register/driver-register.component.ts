import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DocumentService } from '../services/document.service';
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

  documents : Document[] = [];

  constructor(private cdr: ChangeDetectorRef,
    private driverService: DriverService,
    private vehicleService: VehicleService,
    private documentService: DocumentService,
    private driverRegisterService: DriverRegisterService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.recievePersonalInfo();
    this.recieveVehicleInfo();
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

    if (this.formsSubmitted == true){
      this.registerDriver();
    }
  }

  registerDriver(){
    this.addDriver();
    //this.addVehicle();
  }

  private addDriver() {
    this.driverService.add(this.driver).subscribe({
      next: (res: any) => {
        this.driverId = res.id;
        this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"
        }
        );
        this.addVehicle();
        this.addDocuments();
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  private addVehicle() {
    this.vehicleService.add(this.vehicle, this.driverId).subscribe({
      next: (res: any) => {
        this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"
        }
        );
        console.log(res);
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
  }

  private addDocuments(){
    for (let document of this.documents){
      console.log(document);
      this.documentService.add(document, this.driverId).subscribe({
        next: (res: any) => {
          console.log(res);
        },
        error: (error: any) => {
          this.sharedService.openNoResponseSnack();
        }
      });
    }
  }
}
