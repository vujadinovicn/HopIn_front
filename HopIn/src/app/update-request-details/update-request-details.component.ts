import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';
import { Document } from '../services/document.service';
import { RequestDetailsService } from '../services/requestDetails.service';


@Component({
  selector: 'app-update-request-details',
  templateUrl: './update-request-details.component.html',
  styleUrls: ['./update-request-details.component.css','../account-settings/account-settings.component.css','../change-vehicle-info/change-vehicle-info.component.css','../driver-documents/driver-documents.component.css']
})
export class UpdateRequestDetailsComponent implements OnInit {

  requestId: number = 0;
  type: String = 'INFO';
  isRequestSelected: boolean = false;

  @Output() requestIdItemEvent = new EventEmitter<number>();
  requestIdToParent: number = 0;

  personalInfoForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    address: new FormControl(''),
    phonenum: new FormControl(''),
  }, [])

  profileImgPath : string = '../../assets/images/profile-placeholder.png';

  vehicleInfoForm = new FormGroup({
    model: new FormControl(''),
    plates: new FormControl(''),
    seats: new FormControl(''),
  }, [])

  vehicleType: String = "car";
  isPetTransport : boolean = true;
  isBabyTransport: boolean = true;

  document: Document = {
    name: '',
    url: ''
  }

  documentOperation: String = 'ADD';

  constructor(private dialog: MatDialog,
            private requestDetailsService: RequestDetailsService) { }

  ngOnInit(): void {
    this.disableFormFields();
    this.checkIfRequestIsSelected();
    this.recieveRequest();
  }

  disableFormFields(): void{
    this.disablePersonalInfoFormFields();
    this.disableVehicleInfoFormFields();
  }

  private disablePersonalInfoFormFields() {
    (<any>Object).values(this.personalInfoForm.controls).forEach((control: FormControl) => {
      control.disable();
    });
  }

  private disableVehicleInfoFormFields() {
    (<any>Object).values(this.vehicleInfoForm.controls).forEach((control: FormControl) => {
      control.disable();
    });
  }

  checkIfRequestIsSelected(): void {
    this.requestDetailsService.recieveIsRequestSelected().subscribe((res) => { 
      this.isRequestSelected = res;
    });
  }

  recieveRequest(): void {
    this.requestDetailsService.recieveRequest().subscribe((res) => { 
      this.requestId = res.id;
      this.type = res.type;
      this.getFromBack();
    });
  }

  getFromBack(): void {
    if (this.type === 'INFO') {
      this.getPersonalInfoRequest();
    } else if (this.type === 'VEHICLE') {
      this.getVehicleRequest();
    } else if (this.type === 'PASSWORD'){
      this.getPasswordRequest();
    } else if (this.type === 'DOCUMENT') {
      this.getDocumentRequest();
    }
  }

  private getPersonalInfoRequest() {
    this.requestDetailsService.getInfoRequestById(this.requestId).subscribe((res) => {
      this.setPersonalInfoFormValue(res);
      if (res.profilePicture != null) {
        this.profileImgPath = res.profilePicture;
        
        console.log(this.profileImgPath);
      }
    });
  }

  private getVehicleRequest() {
    this.requestDetailsService.getVehicleRequestById(this.requestId).subscribe((res) => {
      this.setVehicleInfoValue(res);
      this.isPetTransport = res.petTransport;
      this.isBabyTransport = res.babyTransport;
      this.vehicleType = res.vehicleType.toLowerCase();
    });
  }

  private getPasswordRequest() {
    this.requestDetailsService.getPasswordRequestById(this.requestId).subscribe((res) => {
    });
  }

  private getDocumentRequest() {
    this.requestDetailsService.getDocumentRequestById(this.requestId).subscribe((res) => {
      this.document.name = res.name;
      this.document.url = res.docuementImage;
      this.documentOperation = res.documentOperationType;
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
}