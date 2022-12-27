import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-feedback',
  templateUrl: './request-feedback.component.html',
  styleUrls: ['./request-feedback.component.css']
})
export class RequestFeedbackComponent implements OnInit {

  status: String = 'declined'

  constructor() { }

  ngOnInit(): void {
  }

}
