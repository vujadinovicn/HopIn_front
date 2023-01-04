import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-register',
  templateUrl: './driver-register.component.html',
  styleUrls: ['./driver-register.component.css']
})
export class DriverRegisterComponent implements OnInit {

  parentComponent = "register";
  constructor() { }

  ngOnInit(): void {
  }

}
