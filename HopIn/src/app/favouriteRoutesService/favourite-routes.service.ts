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

  getAll(id: number): Observable<FavouriteRoute[]> {
    return this.http.get<FavouriteRoute[]>(environment.apiHost + '/passenger/' + id + '/favouriteRoutes');
  }

  removeFavoriteRoute(routeId: number, passengerId: number): Observable<void> {
    return this.http.post<void>(environment.apiHost + '/passenger/' + passengerId + '/remove/route?routeId=' + routeId, null);
  }

  addFavoriteRoute(routeId: number, passengerId: number): Observable<void> {
    return this.http.post<void>(environment.apiHost + '/passenger/' + passengerId + '/return/route?routeId=' + routeId, null)
  }

  addNewFavoriteRoute(passengerId: number, route: FavouriteRoute): Observable<void> {
    return this.http.post<void>(environment.apiHost + '/passenger/' + passengerId + '/add/route', route);
  }

}
