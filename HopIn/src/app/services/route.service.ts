import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RidePassenger, Route, ShortAddress } from './routing.service';

@Injectable({
    providedIn: 'root',
})
export class RouteService {
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
    };
    
    constructor(private http: HttpClient) {}

    getRoutePrice(dto: UnregisteredRideSuggestionDTO) {
        console.log(dto);
        return this.http.post<number>(environment.apiHost + '/ride/price', dto, this.httpOptions);
    }

    createRide(route: Route) {
        console.log(route);
        let ride = this.toRideDto(route);
        console.log(ride);
        return this.http.post<any>(environment.apiHost + '/ride', ride, this.httpOptions);
    }

    convertScheduledTime(scheduledTime: string): Date | null {
        if (scheduledTime != "") {
            let time = new Date();
            let timeSplit = scheduledTime.split(":");
            time.setHours(+timeSplit[0]);
            time.setMinutes(+timeSplit[1]);
            if (time < new Date()) {
                time.setDate(time.getDate() + 1);
            }
            return time;
        } else {
            return null;
        }
    }

    public toRideDto(route: Route): RideDTO {
        return {
            locations: [{"departure": route.pickup, "destination": route.destination}],
            passengers: route.passengers,
            vehicleType: route.vehicleTypeName,
            babyTransport: route.babyTransport,
            petTransport: route.petTransport,
            //
            scheduledTime: this.convertScheduledTime(route.scheduledTime),
            distance: route.distance,
            duration: route.duration,
            price: route.price
        }
    }
}

export interface UnregisteredRideSuggestionDTO {
    vehicleTypeName: string,
    distance: number
}

export interface Location {
    departure: ShortAddress,
    destination:ShortAddress
}

export interface RideDTO {
    locations: Location[],
    passengers: RidePassenger[],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    //
    scheduledTime: Date | null,
    distance: number,
    duration: number,
    price: number,
}


