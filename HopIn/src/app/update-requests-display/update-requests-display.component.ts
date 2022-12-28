import { UpdateRequestService, DriverAccountUpdateRequest } from './../services/driver-update-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-requests-display',
  templateUrl: './update-requests-display.component.html',
  styleUrls: ['./update-requests-display.component.css']
})
export class UpdateRequestsDisplayComponent implements OnInit {

  currentOption: string = "pending";
  selectedRequestId: number = -1;

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

  public selectRequest(request: DriverAccountUpdateRequest) {
    this.selectedRequestId = request.id;
    // ovde dodati kod za prikaz requesta preko id-a
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  private getPending() {
    this.service.getAllPending().subscribe({
      next: (result: DriverAccountUpdateRequest[]) => {
        console.log(result);
        this.pendingRequests = result;
        this.requests = result;
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
