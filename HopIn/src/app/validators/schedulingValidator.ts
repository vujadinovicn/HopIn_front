import { AbstractControl, ValidationErrors } from '@angular/forms';

export function schedulingValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
            let [hours, minutes] = (control.value).split(':');
            let currDate = new Date();
            let totalMinutes = (+hours)*60 + (+minutes);
            let currTotalMinutes = currDate.getHours()*60 + currDate.getMinutes();

            if (totalMinutes < currTotalMinutes) {
                totalMinutes = totalMinutes + 24*60;
            }

            if (totalMinutes - currTotalMinutes < 0 || totalMinutes - currTotalMinutes > 300) {
                return {timeNotAlowed: true};
            }

            return null;
        }
};