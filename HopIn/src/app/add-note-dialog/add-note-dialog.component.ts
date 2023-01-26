import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private noteService: NoteService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addNote(): void {
    if(this.data.reason == '') {
      this.snackBar.open("Please, leave a message!", "", {
        duration: 2000,
     });
     return;
    }
    this.data.isActionSave = true;
    this.dialogRef.close();
  }

}
