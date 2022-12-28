import { UpdateRequestService, DriverAccountUpdateRequest } from './../services/driver-update-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-requests-display',
  templateUrl: './update-requests-display.component.html',
  styleUrls: ['./update-requests-display.component.css']
})
export class UpdateRequestsDisplayComponent implements OnInit {

  currentOption: string = "pending";

  driverImgPath = "../../assets/vectors/login.svg";

  pendingRequests: DriverAccountUpdateRequest[] = [];
  procesedRequests: DriverAccountUpdateRequest[] = [];
  requests: DriverAccountUpdateRequest[] = [];

  constructor(private service: UpdateRequestService) { }

  ngOnInit(): void {
    this.getPending();
    this.getProcessed();
  }

  public chooseOption(chosen: string) {
    this.currentOption = chosen;
    if (chosen == "pending") {
      this.requests = this.pendingRequests;
    } else {
      this.requests = this.procesedRequests;
    }
  }

  private getPending() {
    this.service.getAllPending().subscribe({
      next: (result: DriverAccountUpdateRequest[]) => {
        console.log(result);
        this.pendingRequests = result;
        this.requests = result;
        this.requests[0].driver.profilePicture = this.driverImgPath;
      },
      error: (error: any) => {
        alert("Error fetching pending requests :(");
      }
    });
  }

  private getProcessed() {
    this.service.getAllProcessedAdmin().subscribe({
      next: (result: DriverAccountUpdateRequest[]) => {
        this.procesedRequests = result;
      },
      error: (error: any) => {
        alert("Error fetching processed requests :(");
      }
    });
  }
}
