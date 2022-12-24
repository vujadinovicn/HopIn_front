import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentImageDialogComponent } from '../document-image-dialog/document-image-dialog.component';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-change-documents',
  templateUrl: './change-documents.component.html',
  styleUrls: ['./change-documents.component.css']
})
export class ChangeDocumentsComponent implements OnInit {

  licenceUrl = "../../assets/vectors/login.svg";
  
  documents: Document[] = [];

  constructor(private dialog: MatDialog,
    private documentService: DocumentService) { }

  ngOnInit(): void {
    this.documentService.getById(2).subscribe((res: any) => {
      this.documents = res;
    }
    );
  }

  openLicencePopUp(): void {
    this.dialog.open(DocumentImageDialogComponent, {
      data: {documentName: "Licence image", url: this.licenceUrl},
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
}


export interface Document {
  id: number,
  name: String,
  documentImage: string,
  driverId: number
}
