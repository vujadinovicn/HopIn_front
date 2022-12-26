import { AdminReportOptionsService } from './../services/adminReportOptions.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-report-options',
  templateUrl: './report-options.component.html',
  styleUrls: ['./report-options.component.css']
})
export class ReportOptionsComponent implements OnInit {

  constructor(private router: Router, 
    private adminReportOptionsService : AdminReportOptionsService) { }

  option : string = "all";

  ngOnInit(): void {
    this.selectOption(this.option);
  }

  selectOption(option: string){
    this.option = option;
    this.sendSelectedOption(option);
  }

  sendSelectedOption(option: string): void {
    this.adminReportOptionsService.sendSelectedOption(option);
  }

}
