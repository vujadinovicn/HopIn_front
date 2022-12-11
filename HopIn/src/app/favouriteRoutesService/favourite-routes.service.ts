import { Injectable } from '@angular/core';
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
  constructor() {
    for (let route of routes) {
      const routeObj: FavouriteRoute = {
        _id: route._id,
        from: route.from,
        to: route.to,
        distance: route.distance,
        durationHours: Math.floor(route.duration/60),
        durationMins: route.duration % 60
      };
      this.favouriteRoutes.push(routeObj);
   }
  }

  getAll(): FavouriteRoute[] {
    return this.favouriteRoutes;
  }

}
