import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-account-options',
  templateUrl: './passenger-account-options.component.html',
  styleUrls: ['./passenger-account-options.component.css']
})
export class PassengerAccountOptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.resetOtherColors();
    if (this.router.url == "/account-settings"){
      console.log("2");
      const element = document.getElementById("account-settings-option") as HTMLElement;
      element.style.color="#1E4A5A";
    } else if(this.router.url == "/change-payment-info"){
      const element = document.getElementById("payment-info-option") as HTMLElement;
      element.style.color="#1E4A5A";
    } else if (this.router.url == "/change-password"){
      const element = document.getElementById("password-option") as HTMLElement;
      element.style.color="#1E4A5A";
    }

    //this.changeColor();
  }

  resetOtherColors(){
    const options : HTMLElement[] = [];
    options.push((document.getElementById("account-settings-option") as HTMLElement));
    options.push((document.getElementById("payment-info-option") as HTMLElement));
    options.push((document.getElementById("password-option") as HTMLElement));
    for (let option of options){
      option.style.color="#B1B1B1";
    }
    console.log("sss");
  }

  // changeColor(): void {
  //   if (this.router.url == "/account-settings"){
  //       const element = document.getElementById("account-settings-option") as HTMLElement;
  //       const allOptions = document.getElementsByClassName("account-options") as HTMLCollectionOf<HTMLElement>;
  //       allOptions[0].style.color = "#F1F1F1";
  //       console.log(allOptions);
  //       element.style.color="#1E4A5A";
  //   } else if (this.router.url == "/change-password"){
  //     const element1 = document.getElementById("password-option") as HTMLElement;
  //     const allOptions = document.getElementsByClassName("account-options") as HTMLCollectionOf<HTMLElement>;
  //     allOptions[0].style.color = "#F1F1F1";
  //     element1.style.color="#1E4A5A";
  //   } else {
  //     const element2 = document.getElementById("payment-info-option") as HTMLElement;
  //     const allOptions = document.getElementsByClassName("account-options") as HTMLCollectionOf<HTMLElement>;
  //       allOptions[0].style.color = "#F1F1F1";
  //     element2.style.color="#1E4A5A";
  //   }
  // }

}
