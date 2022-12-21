import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-documents',
  templateUrl: './change-documents.component.html',
  styleUrls: ['./change-documents.component.css']
})
export class ChangeDocumentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  licenceUrl = "../../assets/vectors/login.svg";
  registrationUrl = "../../assets/vectors/login.svg";

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

  onRegistrationFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.registrationUrl = reader.result as string;
      }
    }
  }

}
