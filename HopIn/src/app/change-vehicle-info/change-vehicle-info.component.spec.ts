import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeVehicleInfoComponent } from './change-vehicle-info.component';

describe('ChangeVehicleInfoComponent', () => {
  let component: ChangeVehicleInfoComponent;
  let fixture: ComponentFixture<ChangeVehicleInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeVehicleInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeVehicleInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
