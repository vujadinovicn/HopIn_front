import { Component, OnInit } from '@angular/core';
import { DriverRegisterService } from '../services/driver-register.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  parentComponent = "register";
  formsSubmitted : boolean = false;

  constructor(private driverRegisterService: DriverRegisterService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  changeFormValidity(childisFormValid: any) : void {
    console.log("eee");
    console.log(childisFormValid);
    this.formsSubmitted = this.formsSubmitted && childisFormValid;
  }

  recievePersonalInfo(){
    this.driverRegisterService.recievePersonalInfo().subscribe((res: any) => {
      console.log(res);
    });
  }

  recieveVehicleInfo(){
    this.driverRegisterService.recieveVehicleInfo().subscribe((res: any) => {
      console.log(res);
    });
  }

  save() {
    this.formsSubmitted = true;
    this.recievePersonalInfo();
    this.recieveVehicleInfo();
  }

}
