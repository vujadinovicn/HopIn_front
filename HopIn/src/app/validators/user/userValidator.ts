import { AbstractControl, FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core'

  export function nameRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([a-zA-Zčćđžš ]*)$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { nameRegexError: true };
    }
    return null;
  }

  export function surnameRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([a-zA-Zčćđžš ]*)$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { surnameRegexError: true };
    }
    return null;
  }

  export function phonenumRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*/;
    if (control.value !== undefined && !regex.test(control.value) && control.dirty) {
        return { phonenumRegexError: true };
    }
    return null;
  }

  export function addressRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([a-zA-Z0-9 \s,'-]*)$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { addressRegexError: true };
    }
    return null;
  }

  export function passwordRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([0-9a-zA-Z]{3,}$)/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { passwordRegexError: true };
    }
    return null;
  }

