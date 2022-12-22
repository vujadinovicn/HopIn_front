import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

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
}

export interface UnregisteredRideSuggestionDTO {
    vehicleTypeName: string,
    distance: number
}