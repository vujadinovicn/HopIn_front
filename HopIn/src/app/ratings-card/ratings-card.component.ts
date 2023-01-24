import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings-card',
  templateUrl: './ratings-card.component.html',
  styleUrls: ['./ratings-card.component.css']
})
export class RatingsCardComponent implements OnInit {

  rating: number = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
