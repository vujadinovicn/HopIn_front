import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-vehicle-info',
  templateUrl: './change-vehicle-info.component.html',
  styleUrls: ['./change-vehicle-info.component.css']
})
export class ChangeVehicleInfoComponent implements OnInit {

  constructor() { }

  vehicleInfoForm = new FormGroup({
    model: new FormControl('', [Validators.required]),
    plates: new FormControl('', [Validators.required]),
    seats: new FormControl('', [Validators.required]),
  }, [])

  ngOnInit(): void {
  }

}
