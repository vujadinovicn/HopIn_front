import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FavouriteRoute } from '../favourite-routes/favourite-routes.component';
const routes = [
  {
    _id: 1,
    from: "Novi Sad",
    to: "Belgrade",
    distance: 1.2,
    duration: 45
  },
  {
    _id: 2,
    from: "Zrenjanin",
    to: "Nis",
    distance: 1.2,
    duration: 45
  }
];

@Injectable({
  providedIn: 'root'
})
export class FavouriteRoutesService {
  private favouriteRoutes: FavouriteRoute[] = []
  constructor(private http: HttpClient) {}

  getAll(): Observable<FavouriteRoute[]> {
    return this.http.get<FavouriteRoute[]>(environment.apiHost + '/passenger/1/favouriteRoutes');
  }

}
