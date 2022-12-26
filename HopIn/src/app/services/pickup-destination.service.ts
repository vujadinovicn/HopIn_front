import { ShortAddress } from './routing.service';
import { Injectable } from "@angular/core";
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
  })
export class PickupDestinationService {
    private pickup = new Subject<ShortAddress>();
    private destination = new Subject<ShortAddress>();

    updatePickup(pickup: ShortAddress) {
        this.pickup.next(pickup);
    }

    receivedPickup(): Observable<ShortAddress> {
        return this.pickup.asObservable();
    }

    updateDestination(destination: ShortAddress) {
        this.destination.next(destination);
    }

    receivedDestination(): Observable<ShortAddress> {
        return this.destination.asObservable();
    }
}