import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-review',
  templateUrl: './ride-review.component.html',
  styleUrls: ['./ride-review.component.css']
})
export class RideReviewComponent implements OnInit {

  reason: string = "";
  current: number = 5;
  constructor() { }

  ngOnInit(): void {
  }

}
