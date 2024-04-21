import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DocumentService } from '../services/document.service';
import { DriverRegisterService } from '../services/driver-register.service';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';
import { nameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-document-add-update-dialog',
  templateUrl: './document-add-update-dialog.component.html',
  styleUrls: ['./document-add-update-dialog.component.css']
})
export class DocumentAddUpdateDialogComponent implements OnInit {

  imageSelected: boolean = false;
  url : string = "";
  adminId: number = 0;

  addDocumentForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
  }, [])

  constructor(
    public dialogRef: MatDialogRef<DocumentAddUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private authService: AuthService,
    private sharedService: SharedService,
    private requestDetailsService: RequestDetailsService
  ) {}

  ngOnInit(): void {
    this.setAdminId();
    this.setImageData();
    this.setFormValue();
  }

  private setAdminId() {
    this.authService.getUser().subscribe((res) => {
      this.adminId = this.authService.getId();
    });
  }

  private setImageData(){
    if (this.data.action == "add"){
      this.imageSelected = false;
    } else if (this.data.action == "update"){
      this.imageSelected = true;
      this.url = this.data.url;
    }
  }

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
        this.imageSelected = true;
      }
    }
  }

  save(): void {
    if (this.addDocumentForm.valid && this.imageSelected){
      if (this.data.parentComponent == "update")
        this.saveExistingDriverDocument();
      else{
        this.dialogRef.close({event: "register", data:this.setResponseValue()});
      }
    } else {
      this.sharedService.openInvalidInputSnack();
    }
  }

  private saveExistingDriverDocument() {
    let documentId = 0;
    if (this.data.action == "update")
      documentId = this.data.id;
    this.requestDetailsService.sendDocumentRequest(this.adminId, 1, this.setResponseValue(), documentId).subscribe({
      next: (res: any) => {
        this.router.navigate(['/account-driver']);
        this.sharedService.openSnack({
          value: "Response is in console!",
          color: "back-green"
        }
        );
      },
      error: (error: any) => {
        this.sharedService.openNoResponseSnack();
      }
    });
    this.dialogRef.close({event: "update"});
  }

  private setFormValue(): void {
    if (this.data.action == "add")
      return;
    this.addDocumentForm.setValue({
      name: this.data.name
    })
  }

  private setResponseValue(): any{
    return {
      name: this.addDocumentForm.value.name,
      documentImage : this.url
    }
  }
}
