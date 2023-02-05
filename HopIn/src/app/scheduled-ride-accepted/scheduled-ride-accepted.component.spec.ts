import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledRideAcceptedComponent } from './scheduled-ride-accepted.component';

describe('ScheduledRideAcceptedComponent', () => {
  let component: ScheduledRideAcceptedComponent;
  let fixture: ComponentFixture<ScheduledRideAcceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledRideAcceptedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledRideAcceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
