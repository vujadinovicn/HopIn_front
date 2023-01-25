import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverInfoCardComponent } from './driver-info-card.component';

describe('DriverInfoCardComponent', () => {
  let component: DriverInfoCardComponent;
  let fixture: ComponentFixture<DriverInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
