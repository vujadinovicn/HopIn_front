import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';
import { nameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-document-update-dialog',
  templateUrl: './document-update-dialog.component.html',
  styleUrls: ['./document-update-dialog.component.css']
})
export class DocumentUpdateDialogComponent implements OnInit {

  updateDocumentForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
  }, [])

  constructor(
    public dialogRef: MatDialogRef<DocumentUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentService: DocumentService,
    private sharedService: SharedService,
    private router: Router,
    private requestDetailsService: RequestDetailsService
  ) {}

  ngOnInit(): void {
    this.setFormValue();
  }

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.data.url = reader.result as string;
      }
    }
  }

  save(): void {
    if (this.updateDocumentForm.valid){
      this.requestDetailsService.sendDocumentRequest(2, 2, this.setResponseValue(), this.data.id).subscribe({
        next: (res: any) => {
          this.router.navigate(['/account-driver']);
          this.sharedService.openSnack({
            value: "Response is in console!",
            color: "back-green"}
            );
        },
        error: (error: any) => {
            this.sharedService.openNoResponseSnack();
        }
      });
      this.dialogRef.close();
    } else {
      this.sharedService.openInvalidInputSnack();
    }
  }

  private setResponseValue(): any{
    return {
      name: this.updateDocumentForm.value.name,
      documentImage: this.data.url
    }
  }
  
  private setFormValue(): void {
    this.updateDocumentForm.setValue({
      name: this.data.name
    })
  }
}