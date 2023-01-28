import { SocketService } from './../services/socket.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'net';
import { Panic } from '../services/socket.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  panics: DisplayedPanic[] = [];

  constructor(private socketService: SocketService,
    private userService: UserService) { }

  ngOnInit(): void {
    let newPanic: DisplayedPanic = {
      rideId: 1,
      isDriver: true,
      callerName: 'Milos',
      callerSurName: 'Popovic',
      callerProfilePicture: '../../assets/images/profile-placeholder.png',
      driverName: '',
      driverSurname: '',
      driverProfilePicture: '',
      model: 'Ford Focus',
      plates: 'NS 345345',
      time: 'at 13:33, 23.01.2023'
    }
    this.panics.push(newPanic);
  }

  subscribeToPanic(): void {
    this.socketService.receivedPanic().subscribe((res) => {

    })
  }

  addPassengerPanic(panic: Panic): void {
    this.userService.getByDriverId(panic.ride.driver.id).subscribe((res) => {
      let pic = res.profilePicture;
      if (pic == null) {pic="../../assets/images/profile-placeholder.png";}
      let newPanic: DisplayedPanic = {
        rideId: panic.ride.id,
        isDriver: false,
        callerName: panic.user.name,
        callerSurName: panic.user.surname,
        callerProfilePicture: panic.user.profilePictue,
        driverName: res.name,
        driverSurname: res.surname,
        driverProfilePicture: pic,
        model: res.model,
        plates: res.licenseNumber,
        time: this.formatDate(panic.time)
      }
      this.panics.push(newPanic);
    })
  }

  addDriverPanic(panic: Panic): void {
    this.userService.getByDriverId(panic.ride.driver.id).subscribe((res) => {
      let pic = res.profilePicture;
      if (pic == null) {pic="../../assets/images/profile-placeholder.png";}
      let newPanic: DisplayedPanic = {
        rideId: panic.ride.id,
        isDriver: true,
        callerName: panic.user.name,
        callerSurName: panic.user.surname,
        callerProfilePicture: pic,
        driverName: '',
        driverSurname: '',
        driverProfilePicture: '',
        model: res.model,
        plates: res.licenseNumber,
        time: this.formatDate(panic.time)
      }
      this.panics.push(newPanic);
    })
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
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
  time: string
}