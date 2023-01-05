import { PasswordRequest, RequestDetailsService } from './../services/requestDetails.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.css']
})
export class RequestFeedbackComponent implements OnInit {

  isRequestSelected: boolean = false;
  role = '';
  id: number = 0;
  status: String = 'PENDING';
  reason: String = '';
  admin: String = 'Grace Johns';
  date: String = '';
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

  constructor(private requestDetialsService: RequestDetailsService) {
    this.role = requestDetialsService.role;
  }

  ngOnInit(): void {
    this.recieveRequest();
    // this.requestDetialsService.getRequestById(this.id).subscribe((res) => {
    //   console.log(res);
    //   this.status = res.status;
    //   this.reason = res.reason
    //   this.admin = res.admin.name + ' ' + res.admin.surname;
    //   this.url = res.admin.profilePicture;
    //   this.date = 'at ' + res.time.toString().split('T')[1].slice(0, 5) + ', ' + res.time.toString().split('T')[0];

    // });
  }

  recieveRequest(): void {
    this.requestDetialsService.recieveIsRequestSelected().subscribe((res) => {
      this.isRequestSelected = res;
    });

    this.requestDetialsService.recieveRequest().subscribe((res) => {
      this.id = res.id;
      console.log(res);
      this.requestDetialsService.getRequestById(this.id).subscribe((res) => {
        console.log(res);
        this.status = res.status;
        this.reason = res.reason
        if(res.admin != null) {
          this.admin = res.admin.name + ' ' + res.admin.surname;
          // this.url = res.admin.profilePicture;
        } 
        this.date = this.formatDate(res.time.toString());
      });
    });
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

}

