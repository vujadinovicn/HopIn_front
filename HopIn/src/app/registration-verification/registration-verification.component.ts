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

  constructor(private route: ActivatedRoute, private passengerService: PassengerService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
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

  public resendVerifaction() {

  }

}
