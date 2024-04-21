import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRequestDashboardComponent } from './driver-request-dashboard.component';

describe('DriverRequestDashboardComponent', () => {
  let component: DriverRequestDashboardComponent;
  let fixture: ComponentFixture<DriverRequestDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRequestDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRequestDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
