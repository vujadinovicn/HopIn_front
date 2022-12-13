import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-graph',
  templateUrl: './user-graph.component.html',
  styleUrls: ['./user-graph.component.css'],
})
export class UserGraphComponent implements OnInit {

  saleData = [
    { name: "Mobiles", value: 105000 },
    { name: "Laptop", value: 55000 },
    { name: "AC", value: 15000 },
    { name: "Headset", value: 150000 },
    { name: "Fridge", value: 20000 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
