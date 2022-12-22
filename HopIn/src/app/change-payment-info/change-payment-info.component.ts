import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { cardCvcValidator, cardMonthValidator, cardNumberValidator, cardYearValidator } from '../validators/user/creditCardValidation';
import { nameRegexValidator } from '../validators/user/userValidator';
@Component({
  selector: 'app-change-payment-info',
  templateUrl: './change-payment-info.component.html',
  styleUrls: ['./change-payment-info.component.css']
})
export class ChangePaymentInfoComponent implements OnInit {
  
  changePaymentInfoForm = new FormGroup({
    nameOnCard: new FormControl('', [Validators.required, nameRegexValidator]),
    cardNumber : new FormControl('', [Validators.required, cardNumberValidator]),
    cardMonth: new FormControl('', [Validators.required, cardMonthValidator]),
    cardYear: new FormControl('', [Validators.required, cardYearValidator]),
    cardCvc: new FormControl('', [Validators.required, cardCvcValidator])
  },[]);


  constructor(private passengerAccountOptionsService: PassengerAccountOptionsService,
              private sharedService: SharedService) { }


  ngOnInit(): void {
    markFormControlsTouched(this.changePaymentInfoForm);
  }       

  save(): void {
    if (this.changePaymentInfoForm.valid) {
      this.sharedService.openSnack('SIKE; You thought');
    } else {
      this.sharedService.openInvalidInputSnack();
    }
  }

}