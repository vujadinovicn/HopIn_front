import { PickupDestinationFormComponent } from './../pickup-destination-form/pickup-destination-form.component';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function autocompleteValidator(component: PickupDestinationFormComponent, i: number) {
    return (control: AbstractControl): ValidationErrors | null => {
        console.log(control.value + " " + control.getRawValue());
        console.log(component.markerGenerated[i]);
        if (component.markerGenerated[i])
            return null;
        if (component.notValid[i])
            return { autocompleteNotUsed : true};
        if (!component.changed[i])
            return !component.chosenAddress[i]?.geometry ? { autocompleteNotUsed : true} : null;
        else {
            if (component.odl_addr[i] == control.value)
                return null;
            else 
                return component.chosenAddress[i].formatted_address != control.value ? { autocompleteNotUsed : true} : null;
        }
            
    };
}