import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAccountOptionsComponent } from './passenger-account-options.component';

describe('PassengerAccountOptionsComponent', () => {
  let component: PassengerAccountOptionsComponent;
  let fixture: ComponentFixture<PassengerAccountOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAccountOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAccountOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
