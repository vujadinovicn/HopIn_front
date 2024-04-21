import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePaymentInfoComponent } from './change-payment-info.component';

describe('ChangePaymentInfoComponent', () => {
  let component: ChangePaymentInfoComponent;
  let fixture: ComponentFixture<ChangePaymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePaymentInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
