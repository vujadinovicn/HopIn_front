import { RidePassenger } from './routing.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  constructor(private http: HttpClient) {}

  getAll(id: number): Observable<CompleteRideReviewDTO[]> {
    return this.http.get<CompleteRideReviewDTO[]>(environment.apiHost + '/review/' + id );
  }
  
  saveVehicleReview(review: ReviewDTO, rideId: number): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + '/review/' + rideId + "/vehicle", review);
  }

  saveDriverReview(review: ReviewDTO, rideId: number): Observable<Review> {
    return this.http.post<Review>(environment.apiHost + '/review/' + rideId + "/driver", review);
  }
}

export interface Review {
    id: number,
    rating: number,
    comment: String,
    passenger: RidePassenger
}

export interface ReviewDTO {
  rating: number,
  comment: String,
}

export interface CompleteRideReviewDTO {
    vehicleReview: Review,
    driverReview: Review
}