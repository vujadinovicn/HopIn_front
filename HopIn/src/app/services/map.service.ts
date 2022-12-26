import { Injectable } from "@angular/core";
import { Loader } from "@googlemaps/js-api-loader";

@Injectable({
    providedIn: 'root',
  })
export class MapService {

    private loader = new Loader({
        apiKey: 'AIzaSyADf7wmEupGmb08OGVJR1eNhvtvF6KYuiM&libraries=places&language=en'
    });

    public getLoader() {
        return this.loader;
    }

}