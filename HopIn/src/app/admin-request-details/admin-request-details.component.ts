import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';


@Component({
  selector: 'app-admin-request-details',
  templateUrl: './admin-request-details.component.html',
  styleUrls: ['./admin-request-details.component.css', 
'../account-settings/account-settings.component.css',
'../change-vehicle-info/change-vehicle-info.component.css',
'../driver-documents/driver-documents.component.css']
})
export class AdminRequestDetailsComponent implements OnInit {

  isPetTransport : boolean = true;
  isBabyTransport: boolean = true;

  personalInfoForm = new FormGroup({
    name: new FormControl('aabaa'),
    surname: new FormControl('abab'),
    email: new FormControl('aa'),
    address: new FormControl('aa'),
    phonenum: new FormControl('aa'),
  }, [])

  vehicleInfoForm = new FormGroup({
    model: new FormControl(''),
    plates: new FormControl(''),
    seats: new FormControl(''),
  }, [])

  constructor(private dialog: MatDialog) { }

  profileImgPath : string = "";

  ngOnInit(): void {
    this.disableFormFields();
    //this.adminRequestDetailsForm.controls["name"].disable();
  }

  vehicleType: string = "car";

  changeVehicleType(s: string){}


  private disableFormFields(): void{
    //this.adminRequestDetailsForm.controls["name"].disable();
    (<any>Object).values(this.personalInfoForm.controls).forEach((control: FormControl) => {
      control.disable();
    });
    (<any>Object).values(this.vehicleInfoForm.controls).forEach((control: FormControl) => {
      control.disable();
    });
  }

  openShowDetailsPopUp(): void {
    this.dialog.open(DocumentDetailsDialogComponent, {
      data: {name: "necaaa", url: ""},
    });
  }

  onImageSelect(event: any): void {}

}
