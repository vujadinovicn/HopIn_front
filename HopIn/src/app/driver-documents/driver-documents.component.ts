import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentUpdateDialogComponent } from '../document-update-dialog/document-update-dialog.component';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-driver-documents',
  templateUrl: './driver-documents.component.html',
  styleUrls: ['./driver-documents.component.css']
})
export class DriverDocumentsComponent implements OnInit {

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

  openShowDetailsPopUp(index: number): void {
    this.dialog.open(DocumentDetailsDialogComponent, {
      data: {name: this.documents[index].name, url: this.documents[index].documentImage},
    });
  }

  openUpdateDocumentPopUp(index: number){
    this.dialog.open(DocumentUpdateDialogComponent, {
      data: {name: this.documents[index].name, url: this.documents[index].documentImage},
    })
    this.documentService.recieveUpdate().subscribe((res:any) => {
      this.documents[index].name = res.name;
      this.documents[index].documentImage = res.documentImage;
    })
  }
}

export interface Document {
  id: number,
  name: String,
  documentImage: string,
  driverId: number
}
