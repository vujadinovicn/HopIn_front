import { Component, OnInit } from '@angular/core';
import { defineComponents, IgcRatingComponent } from 'igniteui-webcomponents';

@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      defineComponents(IgcRatingComponent);
  }

}
