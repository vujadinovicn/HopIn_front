import { AuthService } from './../services/auth.service';
import { RequestDetailsService } from './../services/requestDetails.service';
import { UpdateRequestService, DriverAccountUpdateRequest } from './../services/driver-update-request.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-requests-display',
  templateUrl: './update-requests-display.component.html',
  styleUrls: ['./update-requests-display.component.css']
})
export class UpdateRequestsDisplayComponent implements OnInit {

  driverProfilePic = '../../assets/images/profile-placeholder.png';

  _role: String;
  currentOption: string = "pending";
  selectedRequestId: number = -1;

  pendingRequests: DriverAccountUpdateRequest[] = [];
  procesedRequests: DriverAccountUpdateRequest[] = [];
  requests: DriverAccountUpdateRequest[] = [];

  constructor(private service: UpdateRequestService,
    private requestDetailsService: RequestDetailsService, private authService: AuthService) {
      this._role = this.authService.getRole();
      console.log(this.authService.getId());
  }

  ngOnInit(): void {
    this.load();
    this.chooseOption('pending')
  }

  private load(): void {
    this.getPending();
    this.getProcessed();
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
    this.requestDetailsService.sendRequest(request);
    this.requestDetailsService.sendDetailsDisplayed(true);
    this.requestDetailsService.sendIsRequestSelected(true);
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    if (date.getMonth() == 0)
      date.setMonth(1);
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
    let getFunc = this._role == "ROLE_ADMIN"? this.service.getAllPending().subscribe(reaction): this.service.getAllPendingDriver(this.authService.getId()).subscribe(reaction);
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
    let getFunc = this._role == "ROLE_ADMIN"? this.service.getAllProcessedAdmin().subscribe(reaction): this.service.getAllProcessedDriver(this.authService.getId()).subscribe(reaction);
  }
}
