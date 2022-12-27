import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';
import { RequestDetailsService } from '../services/requestDetails.service';


@Component({
  selector: 'app-update-request-details',
  templateUrl: './update-request-details.component.html',
  styleUrls: ['./update-request-details.component.css','../account-settings/account-settings.component.css','../change-vehicle-info/change-vehicle-info.component.css','../driver-documents/driver-documents.component.css']
})
export class UpdateRequestDetailsComponent implements OnInit {

  type: String = 'document';

  document: Document = {
    name: '',
    url: ''
  }
  documentOperation: String = 'ADD';

  isPetTransport : boolean = true;
  isBabyTransport: boolean = true;

  personalInfoForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phonenum: new FormControl(''),
  }, [])

  vehicleInfoForm = new FormGroup({
    model: new FormControl(''),
    plates: new FormControl(''),
    seats: new FormControl(''),
  }, [])

  constructor(private dialog: MatDialog,
    private requestDetialsService: RequestDetailsService) { }

  profileImgPath : string = "";

  ngOnInit(): void {
    this.disableFormFields();
    //this.adminRequestDetailsForm.controls["name"].disable();
    if (this.type === 'info') {
      this.requestDetialsService.getInfoRequestById(2).subscribe((res) => {
        this.setPersonalInfoFormValue(res);
        this.profileImgPath = res.profilePicture;
      });
    } else if (this.type === 'vehicle') {
      this.requestDetialsService.getVehicleRequestById(1).subscribe((res) => {
        this.setVehicleInfoValue(res);
        this.isPetTransport = res.petTransport;
        this.isBabyTransport = res.babyTransport;
      });
    } else if (this.type === 'document') {
      this.requestDetialsService.getDocumentRequestById(1).subscribe((res) => {
        this.document.name = res.name;
        this.document.url = res.docuementImage;
        this.documentOperation = res.documentOperationType;
      });
    }
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
      data: {name: this.document.name, url: this.document.url},
    });
  }

  private setPersonalInfoFormValue(res: any){
    this.personalInfoForm.setValue({
      name: res.name,
      surname: res.surname,
      email: res.email,
      address: res.address,
      phonenum: res.telephoneNumber
    })
  }

  private setVehicleInfoValue(res: any){
    this.vehicleInfoForm.setValue({
      model: res.model,
      plates: res.licenseNumber,
      seats: res.seats,
    })
  }

  onImageSelect(event: any): void {}

}

export interface Document {
  name: String;
  url: String;
}
