import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  private subject = new Subject<Route>();

  constructor() { }

  updateRoute(route: Route) {
    this.subject.next(route);
  }

  receivedRoute(): Observable<Route> {
    return this.subject.asObservable();
  }
}

export interface Route {
  pickup: ShortAddress,
  destination: ShortAddress,
  scheduledTime: string
}

export interface ShortAddress {
  fromatted: String,
  lat: number,
  lng: number
}