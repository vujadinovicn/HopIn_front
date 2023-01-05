import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentUpdateDialogComponent } from '../document-update-dialog/document-update-dialog.component';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';
import { DocumentService } from '../services/document.service';
import { DocumentAddDialogComponent } from '../document-add-dialog/document-add-dialog.component';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-driver-documents',
  templateUrl: './driver-documents.component.html',
  styleUrls: ['./driver-documents.component.css']
})
export class DriverDocumentsComponent implements OnInit {

  licenceUrl = "../../assets/vectors/login.svg";
  
  documents: Document[] = [];

  @Input() parentComponent : string = "";

  constructor(private dialog: MatDialog,
    private documentService: DocumentService,
    private sharedService: SharedService,
    private requestDetailsService: RequestDetailsService) { }

  ngOnInit(): void {
    if (this.parentComponent == "update")
      this.loadExistingDriverDocuments();
  }

  private loadExistingDriverDocuments(){
    this.documentService.getById(2).subscribe((res: any) => {
      this.documents = res;
    }
    );
  }

  deleteDocument(index: number) : void {
    if (this.parentComponent == "update")
      this.deleteExistingDriverDocument(index);
    else 
      this.documents.splice(index, 1);
  }

  private deleteExistingDriverDocument(index: number) {
    let document = {
      name: "forDelete",
      documentImage: "forDelete"
    };
    this.requestDetailsService.sendDocumentRequest(2, 3, document, this.documents[index].id).subscribe({
      next: (res: any) => {
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
  }

  openAddDocumentPopUp(): void {
    let dialogRef = this.dialog.open(DocumentAddDialogComponent, {
      data: {url: "../../assets/vectors/share.svg", parentComponent: this.parentComponent}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'register'){
        this.documents.push(result.data);
      }}
    );
  }

  openShowDetailsPopUp(index: number): void {
    this.dialog.open(DocumentDetailsDialogComponent, {
      data: {name: this.documents[index].name, url: this.documents[index].documentImage},
    });
  }

  openUpdateDocumentPopUp(index: number){
    this.dialog.open(DocumentUpdateDialogComponent, {
      data: {name: this.documents[index].name, url: this.documents[index].documentImage, id: this.documents[index].id, parentComponent: this.parentComponent},
    })
    this.updateDocumentDisplay(index);
  }

  private updateDocumentDisplay(index: number) {
    this.documentService.recieveUpdate().subscribe((res: any) => {
      this.documents[index].name = res.name;
      this.documents[index].documentImage = res.documentImage;
    });
  }
}

export interface Document {
  id: number,
  name: String,
  documentImage: string,
  driverId: number
}
