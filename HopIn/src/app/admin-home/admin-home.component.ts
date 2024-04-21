import { PanicService } from './../services/panic.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SocketService } from './../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'net';
import { Panic } from '../services/socket.service';
import { UserService } from '../services/user.service';
import { t } from 'chart.js/dist/chunks/helpers.core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  panics: DisplayedPanic[] = [];
  hasNew: boolean = false;

  constructor(private socketService: SocketService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private panicService: PanicService) { }

  ngOnInit(): void {
    this.panics = this.panicService.panics;
    this.panicService.receivedPanic().subscribe((res) => {
      this.panics = res;
    })

    this.panicService.receivedHasNew().subscribe((res) => {
      this.hasNew = res;
    })
  }

  openRequests(): void {
    this.router.navigate(['/request-dashboard']);
  }

  markAsSeen(): void {
    this.hasNew = false;
    this.panicService.updateHasNew(false);
  }

}


export interface DisplayedPanic {
  rideId: number,
  isDriver: boolean,
  callerName: string,
  callerSurName: string,
  callerProfilePicture: string,
  driverName: string,
  driverSurname: string,
  driverProfilePicture: string,
  model: string,
  plates: string,
  time: string,
  reason: string
}