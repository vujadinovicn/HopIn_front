import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-passenger-account-update-options',
  templateUrl: './passenger-account-update-options.component.html',
  styleUrls: ['./passenger-account-update-options.component.css']
})
export class PassengerAccountUpdateOptionsComponent implements OnInit {

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
