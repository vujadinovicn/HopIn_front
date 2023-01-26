import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes-display',
  templateUrl: './notes-display.component.html',
  styleUrls: ['./notes-display.component.css']
})
export class NotesDisplayComponent implements OnInit {

  url: String = '../../assets/images/profile-placeholder.png';

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

}
