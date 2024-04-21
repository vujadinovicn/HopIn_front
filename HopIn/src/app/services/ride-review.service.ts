import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Review } from './review.service';

@Injectable({
  providedIn: 'root',
})
export class RideReviewService {
    constructor(private http: HttpClient) {}

    addVehicleReview(vehicleReview: ReviewDTO, rideId: number): Observable<any> {
        const options: any = {
          responseType: 'json',
        };
        return this.http.post<string>(environment.apiHost + '/review/' + rideId + "/vehicle" , vehicleReview, options);
      }

    addDriverReview(driverReview: ReviewDTO, rideId: number): Observable<any> {
    const options: any = {
        responseType: 'json',
    };
    return this.http.post<string>(environment.apiHost + '/review/' + rideId + "/driver" , driverReview, options);
    }

    addCompleteReview(reviews: ReviewDTO[], rideId: number): Observable<any> {
      const options: any = {
          responseType: 'json',
      };
      return this.http.post<Object>(environment.apiHost + '/review/' + rideId + "/complete-review" , reviews, options);
      }
}

export interface ReviewDTO{
  rating: number;
  comment: string
}