import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private subject = new Subject<Route>();

  public route: Route = {} as Route;

  constructor() { }

  updateRoute(route: Route) {
    this.route = route;
    this.subject.next(route);
  }

  receivedRoute(): Observable<Route> {
    return this.subject.asObservable();
  }
}

export interface Route {
  pickup: ShortAddress,
  destination: ShortAddress,
  scheduledTime: string,
  distance: number,
  distanceFormatted: string,
  duration: number,
  durationFormatted: string,
}

export interface ShortAddress {
  formatted: String,
  lat: number,
  lng: number
}