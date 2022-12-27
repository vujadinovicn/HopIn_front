import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'update-requests-display',
  templateUrl: './update-requests-display.component.html',
  styleUrls: ['./update-requests-display.component.css']
})
export class UpdateRequestsDisplayComponent implements OnInit {

  currentOption: string = "pending";

  requests: Request[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  public chooseOption(chosen: string) {
    this.currentOption = chosen;
    if (chosen == "pending") {
      
    } else {
      
    }
  }

}
