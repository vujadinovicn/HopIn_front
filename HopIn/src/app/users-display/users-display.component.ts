import { BlockService } from './../services/block.service';
import { Driver, User } from './../services/user.service';
import { DriverService } from './../services/driver.service';
import { PassengerService } from './../services/passenger.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-display',
  templateUrl: './users-display.component.html',
  styleUrls: ['./users-display.component.css']
})
export class UsersDisplayComponent implements OnInit {

  currentOption: string = "passengers";
  selectedUserId: number = -1;

  passengers: User[] = [];
  drivers: User[] = [];
  currentDisplay: User[] = [];

  url : String = "../../assets/images/profile-placeholder.png";

  onFileSelect(event: any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(e: any)=>{
        this.url = reader.result as string;
      }
    }
  }

  constructor(private passengerService: PassengerService,
    private driverService: DriverService,
    private blockService: BlockService) { }

  ngOnInit(): void {
    this.getResults();
    this.chooseOption('passengers');
  }

  getResults(): void {
    this.getPassengers();
    this.getDrivers();
  }

  public chooseOption(chosen: string) {
    this.currentOption = chosen;
    this.selectedUserId = -1;
    if (chosen == "passengers") {
      this.currentDisplay = this.passengers;
    } else {
      this.currentDisplay = this.drivers;
    }
  }

  public selectUser(user: User): void {
    this.selectedUserId = user.id;
    this.blockService.setUser(user);
    this.blockService.setIsSelected(true);
  }

  private getPassengers(): void {
    this.passengerService.getAll().subscribe((res) => {
      this.passengers = res.results;
      this.currentDisplay = res.results;
    })
  }

  private getDrivers(): void {
    this.driverService.getAll().subscribe((res) => {
      this.drivers = res.results;
    })
  }



}
