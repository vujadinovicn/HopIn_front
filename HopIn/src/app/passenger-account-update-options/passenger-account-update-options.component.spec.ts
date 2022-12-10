import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAccountUpdateOptionsComponent } from './passenger-account-update-options.component';

describe('PassengerAccountUpdateOptionsComponent', () => {
  let component: PassengerAccountUpdateOptionsComponent;
  let fixture: ComponentFixture<PassengerAccountUpdateOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAccountUpdateOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAccountUpdateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
