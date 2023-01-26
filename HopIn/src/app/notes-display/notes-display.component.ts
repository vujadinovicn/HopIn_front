import { BlockService } from './../services/block.service';
import { NoteService } from './../services/note.service';
import { Component, OnInit } from '@angular/core';
import { Note } from '../services/note.service';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { User } from '../services/user.service';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

  url: String = '../../assets/images/profile-placeholder.png';
  user: User = {} as User;
  notes: Note[] = [];
  infoForDialog: NotesDialogData = {
    name: this.user.name,
    reason: '',
    isActionSave: false
  }

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor(private noteService: NoteService,
    private blockService: BlockService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.blockService.getUser().subscribe((res) => {
      if(res.id != undefined) {
        this.user = res;
        this.noteService.getNotes(res.id).subscribe((allNotes) => {
          this.notes = allNotes.results;
          for (let note of this.notes) {
            note.date = this.formatDate(note.date);
          }
        });
      }
    });
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  openDialog(): void {
    this.infoForDialog.name = this.user.name
    const dialogRef = this.dialog.open(AddNoteDialogComponent, {
      // width: '250px',
      data: this.infoForDialog
    });

    dialogRef.afterClosed().subscribe(result => {
      this.noteService.addNote(this.infoForDialog.reason, this.user.id).subscribe((res) => {
        res.date = this.formatDate(res.date);
        this.notes.push(res);
      });

      this.infoForDialog.reason = '';
      this.infoForDialog.isActionSave = false;
      dialogRef.close();
    });
  }

}

export interface NotesDialogData {
  name: string;
  reason: string;
  isActionSave: boolean
}
