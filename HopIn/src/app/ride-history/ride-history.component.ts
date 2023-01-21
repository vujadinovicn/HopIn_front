import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  public form!: FormGroup;
  rating: number;

  constructor(private fb: FormBuilder) {
    this.rating = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  ratingStyle = {
    starsStyle: {'height' : '22px', 'width' : '22px'},
    ratingStyle: {'font-size' : '18px'},
    countStyle: {'font-size' : '14px'}
}

}
