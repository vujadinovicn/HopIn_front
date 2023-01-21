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
}

export interface Review {
    id: number,
    rating: number,
    comment: String,
}

export interface CompleteRideReviewDTO {
    vehicleReview: Review,
    driverReview: Review
}