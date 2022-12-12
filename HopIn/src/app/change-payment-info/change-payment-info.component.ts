import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cardCvcValidator, cardMonthValidator, cardNumberValidator, cardYearValidator } from '../validators/creditCardValidation';
import { CardCvcErrorStateMatcher, CardNumberErrorStateMatcher, CardMonthErrorStateMatcher, CardYearErrorStateMatcher} from '../validators/creditCardValidation';
@Component({
  selector: 'app-change-payment-info',
  templateUrl: './change-payment-info.component.html',
  styleUrls: ['./change-payment-info.component.css']
})
export class ChangePaymentInfoComponent implements OnInit {


  cardNumberErrorStateMatcher = new CardNumberErrorStateMatcher();
  cardMonthErrorStateMatcher = new CardMonthErrorStateMatcher();
  cardYearErrorStateMatcher = new CardYearErrorStateMatcher();
  cardCvcErrorStateMatcher = new CardCvcErrorStateMatcher();


  constructor() { }

  changePaymentInfoForm = new FormGroup({
    nameOnCard: new FormControl('', [Validators.required]),
    cardNumber : new FormControl('', [Validators.required]),
    cardMonth: new FormControl('', [Validators.required]),
    cardYear: new FormControl('', [Validators.required]),
    cardCvc: new FormControl('', [Validators.required])
  }, [cardNumberValidator("cardNumber"), cardMonthValidator("cardMonth"), cardYearValidator("cardYear"), cardCvcValidator("cardCvc")]);

  ngOnInit(): void {}

  save(): void {
    if (this.changePaymentInfoForm.valid) {
      alert("PARTIZAN SAMPION");
    }
    else {
      alert("SISAJ ZVEZDO")
    }
  }


}