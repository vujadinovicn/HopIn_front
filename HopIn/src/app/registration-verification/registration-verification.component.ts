import { SharedService } from './../shared/shared.service';
import { PassengerService } from './../services/passenger.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration-verification',
  templateUrl: './registration-verification.component.html',
  styleUrls: ['./registration-verification.component.css']
})
export class RegistrationVerificationComponent implements OnInit {

  message: string = '';
  isVerified: string = '';
  code: string = '';

  constructor(private route: ActivatedRoute, private passengerService: PassengerService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.code = params['code'];
        this.passengerService.verifyRegistration(params['code']).subscribe({
          next: (res) => {
            this.isVerified = 'true';
          },
          error: (err) => {
            this.isVerified = 'false';
          }        
        });
      }
    );
  }

  resendVerifaction() {
    this.passengerService.resendVerificationMail(this.code).subscribe({
      next: (res) => {
        this.sharedService.openSnack({
          value: "Resend successful. Check your email.",
          color: "back-green"
        });
      },
      error: (err) => {
        this.sharedService.openSnack({
          value: "Resend failed. Invalid code or already acitvated?",
          color: "back-red"
        });
      }
    });
  }

}
