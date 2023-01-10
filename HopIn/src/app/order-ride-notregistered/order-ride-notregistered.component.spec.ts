import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRideNotregisteredComponent } from './order-ride-notregistered.component';

describe('OrderRideNotregisteredComponent', () => {
  let component: OrderRideNotregisteredComponent;
  let fixture: ComponentFixture<OrderRideNotregisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRideNotregisteredComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRideNotregisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
