import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ride-review',
  templateUrl: './ride-review.component.html',
  styleUrls: ['./ride-review.component.css']
})
export class RideReviewComponent implements OnInit {

  reason: string = "";
  current: number = 5;
  constructor() { }

  reviewForm = new FormGroup({
    driverReview: new FormControl('', [Validators.required]),
    vehicleReview: new FormControl('', [Validators.required]),
  }, [])

  ngOnInit(): void {
  }

  save(){
    
  }
}
