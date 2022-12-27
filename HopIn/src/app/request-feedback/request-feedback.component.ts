import { PasswordRequest, RequestDetailsService } from './../services/requestDetails.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.css']
})
export class RequestFeedbackComponent implements OnInit {


  status: String = 'ACCEPTED';
  reason: String = '';
  admin: String = '';
  url: String = '../../assets/vectors/profileAvatar.svg';

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor(private requestDetialsService: RequestDetailsService) { }

  ngOnInit(): void {
    this.requestDetialsService.getRequestById(1).subscribe((res) => {
      this.status = res.status;
      this.reason = res.reason
      this.admin = res.admin.name + ' ' + res.admin.surname;
      this.url = res.admin.profilePicture;
    });
  }

}

