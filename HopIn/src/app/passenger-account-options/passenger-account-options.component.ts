import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-account-options',
  templateUrl: './passenger-account-options.component.html',
  styleUrls: ['./passenger-account-options.component.css']
})
export class PassengerAccountOptionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  changeClickedColor(element: HTMLElement): void {
    element.style.color="#1E4A5A";
  }

  resetOptionsColor(): void {
    const optionElements = document.getElementsByClassName("account-options") as HTMLCollectionOf<HTMLElement>;
    Array.from(optionElements).forEach(function (element) {
      element.style.color = "#B1B1B1";
    });
  }

}
