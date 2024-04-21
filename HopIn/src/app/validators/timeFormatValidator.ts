import { AbstractControl } from '@angular/forms';

export function timeFormatValidator( control: AbstractControl): { [key: string]: boolean } | null {
    const regex = /([01]?[0-9]|2[0-3]):[0-5][0-9]/;
    if (control.dirty && control.value != '')
        if (control.value !== undefined && !regex.test(control.value)) {
            return { timeFormatError: true };
        }
    return null
  }