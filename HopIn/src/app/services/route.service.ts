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
        let ride = this.toRideDto(route);
        return this.http.post<RideDTO>(environment.apiHost + '/ride', ride, this.httpOptions);
    }

    public toRideDto(route: Route): RideDTO {
        return {
            locations: [route.pickup, route.destination],
            passengers: route.passengers,
            vehicleType: route.vehicleTypeName,
            babyTransport: route.babyTransport,
            petTransport: route.petTransport,
            //
            scheduledTime: route.scheduledTime,
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

export interface RideDTO {
    locations: ShortAddress[],
    passengers: RidePassenger[],
    vehicleType: string,
    babyTransport: boolean,
    petTransport: boolean,
    //
    scheduledTime: string,
    distance: number,
    duration: number,
    price: number,
}
