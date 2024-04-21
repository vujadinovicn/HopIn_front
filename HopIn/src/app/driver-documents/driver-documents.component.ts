import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DocumentDetailsDialogComponent } from '../document-details-dialog/document-details-dialog.component';
import { DocumentReturned, DocumentService } from '../services/document.service';
import { DocumentAddUpdateDialogComponent } from '../document-add-update-dialog/document-add-update-dialog.component';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-driver-documents',
  templateUrl: './driver-documents.component.html',
  styleUrls: ['./driver-documents.component.css']
})
export class DriverDocumentsComponent implements OnInit {

  licenceUrl = "../../assets/vectors/login.svg";
  
  driverId: number = 0;
  documents: DocumentReturned[] = [];

  @Input() parentComponent : string = "";
  @Output() sentDocument = new EventEmitter<DocumentReturned[]>();

  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private documentService: DocumentService,
    private sharedService: SharedService,
    private requestDetailsService: RequestDetailsService) { }

  ngOnInit(): void {
    this.setDriverId();
    if (this.parentComponent == "update")
      this.loadExistingDriverDocuments();
  }

  private setDriverId() {
    this.authService.getUser().subscribe((res) => {
      this.driverId = this.authService.getId();
    });
  }

  private loadExistingDriverDocuments(){
    this.documentService.getById(this.driverId).subscribe((res: any) => {
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
    let document = this.setValueForDelete();
    this.requestDetailsService.sendDocumentRequest(this.driverId, 3, document, this.documents[index].id).subscribe({
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

  private setValueForDelete() {
    return {
      name: "forDelete",
      documentImage: "forDelete"
    };
  }

  openAddDocumentPopUp(): void {
    let dialogRef = this.dialog.open(DocumentAddUpdateDialogComponent, {
      data: {action: "add", url: "../../assets/vectors/share.svg", parentComponent: this.parentComponent}
    });
    this.addDocumentDisplay(dialogRef);
  }

  private addDocumentDisplay(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result.event == 'register') {
        this.documents.push(result.data);
        this.sentDocument.emit(result.data);
      }
    }
    );
  }

  openShowDetailsPopUp(index: number): void {
    this.dialog.open(DocumentDetailsDialogComponent, {
      data: {name: this.documents[index].name, url: this.documents[index].documentImage},
    });
  }

  openUpdateDocumentPopUp(index: number){
    this.dialog.open(DocumentAddUpdateDialogComponent, {
      data: {action: "update", name: this.documents[index].name, url: this.documents[index].documentImage, id: this.documents[index].id, parentComponent: this.parentComponent},
    })
    this.updateDocumentDisplay(index);
  }

  updateDocumentDisplay(index: number) {
    this.documentService.recieveUpdate().subscribe((res: any) => {
      this.documents[index].name = res.name;
      this.documents[index].documentImage = res.documentImage;
    });
  }
}
