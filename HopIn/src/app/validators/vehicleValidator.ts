import { AbstractControl } from "@angular/forms";

export function platesRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([A-Z]{2}-[0-9]{3}-[A-Z]{2})$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { platesRegexError: true };
    }
    return null;
  }

export function modelRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([a-zA-Z0-9- ]*)$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { modelRegexError: true };
    }
    return null;
    }

export function seatsRegexValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /^([0-9]*)$/;
    if (control.value !== undefined && !regex.test(control.value)) {
        return { seatsRegexError: true };
    }
    return null;
    }


