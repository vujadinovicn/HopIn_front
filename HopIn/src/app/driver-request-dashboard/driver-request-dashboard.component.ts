import { RequestDetailsService } from './../services/requestDetails.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-request-dashboard',
  templateUrl: './driver-request-dashboard.component.html',
  styleUrls: ['./driver-request-dashboard.component.css']
})
export class DriverRequestDashboardComponent implements OnInit {

  areDetailsDisplayed: boolean = false;

  constructor(private requestDetailsService: RequestDetailsService) { }

  ngOnInit(): void {
    this.recieveDetailsDisplayed();
  }

  recieveDetailsDisplayed(): void {
    this.requestDetailsService.recieveDetailsDisplayed().subscribe((res) => { 
      this.areDetailsDisplayed = res;
    });
  }

}
