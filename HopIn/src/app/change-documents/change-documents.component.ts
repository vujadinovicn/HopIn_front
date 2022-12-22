import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentImageDialogComponent } from '../document-image-dialog/document-image-dialog.component';

@Component({
  selector: 'app-change-documents',
  templateUrl: './change-documents.component.html',
  styleUrls: ['./change-documents.component.css']
})
export class ChangeDocumentsComponent implements OnInit {

  licenceUrl = "../../assets/vectors/login.svg";
  registrationUrl = "../../assets/vectors/login.svg";

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openLicencePopUp(): void {
    this.dialog.open(DocumentImageDialogComponent, {
      data: {documentName: "Licence image", url: this.licenceUrl},
    });
  }

  openRegistrationPopUp(): void {
    this.dialog.open(DocumentImageDialogComponent, {
      data: {documentName: "Registration image", url: this.registrationUrl},
    });
  }

  onLicenceFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.licenceUrl = reader.result as string;
      }
      console.log(this.licenceUrl);
    }
  }

  onRegistrationFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.registrationUrl = reader.result as string;
      }
      console.log(this.registrationUrl);
    }
  }

}
