import { RequestDetailsService } from './../services/requestDetails.service';
import { UpdateRequestService, DriverAccountUpdateRequest } from './../services/driver-update-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-requests-display',
  templateUrl: './update-requests-display.component.html',
  styleUrls: ['./update-requests-display.component.css']
})
export class UpdateRequestsDisplayComponent implements OnInit {

  _role: String;
  currentOption: string = "pending";
  selectedRequestId: number = -1;

  pendingRequests: DriverAccountUpdateRequest[] = [];
  procesedRequests: DriverAccountUpdateRequest[] = [];
  requests: DriverAccountUpdateRequest[] = [];

  constructor(private service: UpdateRequestService,
    private requestDetailsService: RequestDetailsService) {
      this._role = requestDetailsService.role;
  }

  ngOnInit(): void {
    this.getPending();
    this.getProcessed();
    this.chooseOption('pending')
  }

  public chooseOption(chosen: string) {
    this.currentOption = chosen;
    this.requestDetailsService.sendIsRequestSelected(false)
    this.selectedRequestId = -1;
    if (chosen == "pending") {
      this.requests = this.pendingRequests;
    } else {
      this.requests = this.procesedRequests;
    }
  }

  public selectRequest(request: DriverAccountUpdateRequest) {
    this.selectedRequestId = request.id;
    // ovde dodati kod za prikaz requesta preko id-a
    this.requestDetailsService.sendRequest(request);
    this.requestDetailsService.sendDetailsDisplayed(true);
    this.requestDetailsService.sendIsRequestSelected(true);
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

  private getPending() {
    let reaction: any = {
      next: (result: DriverAccountUpdateRequest[]) => {
        console.log(result);
        this.pendingRequests = result;
        this.requests = result;
      },
      error: (error: any) => {
        alert("Error fetching pending requests :(");
      }
    };
    let getFunc = this._role == "admin"? this.service.getAllPending().subscribe(reaction): this.service.getAllPendingDriver(2).subscribe(reaction);
  }

  private getProcessed() {
    let reaction: any = {
      next: (result: DriverAccountUpdateRequest[]) => {
        this.procesedRequests = result;
      },
      error: (error: any) => {
        alert("Error fetching processed requests :(");
      }
    };
    let getFunc = this._role == "admin"? this.service.getAllProcessedAdmin().subscribe(reaction): this.service.getAllProcessedDriver(2).subscribe(reaction);
  }
}
