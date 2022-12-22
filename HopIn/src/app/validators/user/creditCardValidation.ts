import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'


export function cardNumberValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^(\d{13,17})$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return {cardNumberError: true}
    }
    return null ;
}

export function cardMonthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^(0?[1-9]|1[012])$/;
    if (control.value !== undefined && (!regex.test(control.value) || control.value.length == 1)){
        return { cardMonthError : true} 
    };
    return null;
}

export function cardYearValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^(0[0-9]|1[0-9])$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { cardYearError : true}
    };
    return null;
}

export function cardCvcValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /\d{3}/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { cardCvcError : true};
    };
    return null;
}