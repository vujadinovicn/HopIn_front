import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRideComponent } from './order-ride.component';

describe('OrderRideComponent', () => {
  let component: OrderRideComponent;
  let fixture: ComponentFixture<OrderRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
