import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  id: number = 0;
  type: String = 'INFO';
  isRequestSelected: boolean = false;

  @Output() requestIdItemEvent = new EventEmitter<number>();
  requestIdToParent: number = 0;

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

  driverTepPhotoUrl = '../../assets/driver.jpg';    
  profileImgPath : string = "";

  ngOnInit(): void {
    this.disableFormFields();
    this.recieveRequest();
  }

  recieveRequest(): void {
    this.requestDetialsService.recieveIsRequestSelected().subscribe((res) => { 
      this.isRequestSelected = res;
    });

    this.requestDetialsService.recieveRequest().subscribe((res) => { 
      this.id = res.id;
      this.type = res.type;
      this.getFromBack();
    });
  }

  getFromBack(): void {
    if (this.type === 'INFO') {
      this.requestDetialsService.getInfoRequestById(this.id).subscribe((res) => {
        this.setPersonalInfoFormValue(res);
        this.profileImgPath = res.profilePicture;
      });
    } else if (this.type === 'VEHICLE') {
      this.requestDetialsService.getVehicleRequestById(this.id).subscribe((res) => {
        console.log(res);
        this.setVehicleInfoValue(res);
        this.isPetTransport = res.petTransport;
        this.isBabyTransport = res.babyTransport;
        this.vehicleType = res.vehicleType.toLowerCase();
      });
    } else if (this.type === 'PASSWORD'){
      this.requestDetialsService.getPasswordRequestById(this.id).subscribe((res) => {
      })
    } 
    else if (this.type === 'DOCUMENT') {
      this.requestDetialsService.getDocumentRequestById(this.id).subscribe((res) => {
        this.document.name = res.name;
        this.document.url = res.docuementImage;
        this.documentOperation = res.documentOperationType;
      });
    }
  }

  vehicleType: String = "car";

  changeVehicleType(s: string){}


  private disableFormFields(): void{
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
      seats: res.passengerSeats,
    })
  }

  onImageSelect(event: any): void {}

}

export interface Document {
  name: String;
  url: String;
}
