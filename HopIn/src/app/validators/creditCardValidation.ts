import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'


export function cardNumberValidator(cardNumber: string) {

    return function(form: AbstractControl) {
        const cardNumberValue = form.get(cardNumber)?.value;
        const regex = /^(\d{13,17})$/;
        if (regex.test(cardNumberValue)) {
            console.log("da");
            return null;
        }

        return { cardNumberError: true} ;
    }
}

export function cardMonthValidator(cardMonth: string){
    return function(form: AbstractControl){
        const cardMonthValue = form.get(cardMonth)?.value;
        const regex = /^(0?[1-9]|1[012])$/;
        if (regex.test(cardMonthValue) && cardMonthValue.length != 1){return null};
        return { cardMonthError : true}
    }
}

export function cardYearValidator(cardYear: string){
    return function(form: AbstractControl){
        const cardYearValue = form.get(cardYear)?.value;
        const regex = /^(0[0-9]|1[0-9])$/;
        if (regex.test(cardYearValue)) {
            return null};
        return { cardYearError : true}
    }
}

export function cardCvcValidator(cardCvc: string){
    return function(form: AbstractControl){
        const cardCvcValue = form.get(cardCvc)?.value;
        const regex = /\d{3}/;
        if (regex.test(cardCvcValue)) {return null};
        return { cardCvcError : true}
    }
}

export class CardNumberErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control?.parent?.errors?.['cardNumberError'] && control?.dirty) return true;
        return false;
	}
}

export class CardMonthErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control?.parent?.errors?.['cardMonthError'] && control?.dirty) return true;
        return false;
	}
}

export class CardYearErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control?.parent?.errors?.['cardYearError'] && control?.dirty) return true;
        return false;
	}
}

export class CardCvcErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		if (control?.parent?.errors?.['cardCvcError'] && control?.dirty) return true;
        return false;
	}
}