import { AuthService } from './../services/auth.service';
import { SocketService } from './../services/socket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  constructor(
    private socketService: SocketService,
    private authService: AuthService,
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  declineInvitation() {
    this.socketService.sendInviteResponse({passengerId: this.authService.getId(), response: false}, this.data.invite.from.id);
    this.close();
  }

  acceptInvitation() {
    console.log(this.data);
    this.socketService.sendInviteResponse({passengerId: this.authService.getId(), response: true}, this.data.invite.from.id);
    this.close();
  }

}
