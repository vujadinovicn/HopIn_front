import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.css']
})
export class RequestFeedbackComponent implements OnInit {

  request: Request = {
    status: 'declined',
    reason: 'Lorem ipsum dolor sit amet consectetur. Sed metus risus amet at at tellus quis aenean. Euismod dui platea urna velit vel pellentesque egestas sed at. Interdum euismod auctor hendrerit maecenas elit. Lorem ipsum dolor sit amet consectetur.' 
    };

  constructor() { }

  ngOnInit(): void {
  }

}

export interface Request {
  status: String;
  reason: String;
}
