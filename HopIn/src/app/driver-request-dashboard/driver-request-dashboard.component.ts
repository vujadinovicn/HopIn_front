import { RequestDetailsService } from './../services/requestDetails.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'driver-request-dashboard',
  templateUrl: './driver-request-dashboard.component.html',
  styleUrls: ['./driver-request-dashboard.component.css']
})
export class DriverRequestDashboardComponent implements OnInit {

  _role: String = 'driver';

  constructor(private requestDetailsService: RequestDetailsService) { }

  ngOnInit(): void {
  }

}
