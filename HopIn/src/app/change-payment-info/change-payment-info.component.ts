import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { SharedService } from '../shared/shared.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { cardCvcValidator, cardMonthValidator, cardNumberValidator, cardYearValidator } from '../validators/user/creditCardValidation';
import { CardCvcErrorStateMatcher, CardNumberErrorStateMatcher, CardMonthErrorStateMatcher, CardYearErrorStateMatcher} from '../validators/user/creditCardValidation';
import { nameRegexValidator } from '../validators/user/userValidator';
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

  changePaymentInfoForm = new FormGroup({
    nameOnCard: new FormControl('', [Validators.required, nameRegexValidator]),
    cardNumber : new FormControl('', [Validators.required]),
    cardMonth: new FormControl('', [Validators.required]),
    cardYear: new FormControl('', [Validators.required]),
    cardCvc: new FormControl('', [Validators.required])
  }, [cardNumberValidator("cardNumber"), cardMonthValidator("cardMonth"), cardYearValidator("cardYear"), cardCvcValidator("cardCvc")]);


  constructor(private passengerAccountOptionsService: PassengerAccountOptionsService,
              private sharedService: SharedService) { }


  ngOnInit(): void {
    this.sendColorChange();
    markFormControlsTouched(this.changePaymentInfoForm);
  }       

  save(): void {
    if (this.changePaymentInfoForm.valid) {
      this.sharedService.openSnack('SIKE; You thought');
    } else {
      this.sharedService.openInvalidInputSnack();
    }
  }

  sendColorChange(): void {
    this.passengerAccountOptionsService.sendColorChange(
      {
        accountSettingsColor: "dark-gray",
        passwordColor: "dark-gray",
        paymentInfoColor: "dark-blue"
      }
    )
  }

}