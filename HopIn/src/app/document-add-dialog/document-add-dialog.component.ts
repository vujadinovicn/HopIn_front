import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from '../services/document.service';
import { nameRegexValidator } from '../validators/user/userValidator';

@Component({
  selector: 'app-document-add-dialog',
  templateUrl: './document-add-dialog.component.html',
  styleUrls: ['./document-add-dialog.component.css']
})
export class DocumentAddDialogComponent implements OnInit {

  selected: boolean = false;
  addDocumentForm = new FormGroup({
    name: new FormControl('', [Validators.required, nameRegexValidator]),
  }, [])

  constructor(
    public dialogRef: MatDialogRef<DocumentAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
  }

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.data.url = reader.result as string;
        this.selected = true;
      }
    }
  }

  save(): void {
    if (this.addDocumentForm.valid){
      this.documentService.sendUpdate(this.setResponseValue());
      this.dialogRef.close();
    }
  }

  private setResponseValue(): any{
    return {
      name: this.addDocumentForm.value.name
    }
  }
}
