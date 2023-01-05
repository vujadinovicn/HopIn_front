import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';
import { nameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-document-add-dialog',
  templateUrl: './document-add-dialog.component.html',
  styleUrls: ['./document-add-dialog.component.css']
})
export class DocumentAddDialogComponent implements OnInit {

  imageSelected: boolean = false;
  url : string = "";
  addDocumentForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
  }, [])

  constructor(
    public dialogRef: MatDialogRef<DocumentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router, 
    private documentService: DocumentService,
    private sharedService: SharedService,
    private requestDetailsService: RequestDetailsService
  ) {}

  ngOnInit(): void {
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
      else
        this.dialogRef.close({event: "register", data:this.setResponseValue()});
    } else {
      this.sharedService.openInvalidInputSnack();
    }
  }

  private saveExistingDriverDocument() {
    this.requestDetailsService.sendDocumentRequest(2, 1, this.setResponseValue(), 0).subscribe({
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

  private setResponseValue(): any{
    return {
      name: this.addDocumentForm.value.name,
      documentImage : this.url
    }
  }
}
