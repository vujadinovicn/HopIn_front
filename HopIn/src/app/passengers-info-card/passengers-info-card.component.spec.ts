import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengersInfoCardComponent } from './passengers-info-card.component';

describe('PassengersInfoCardComponent', () => {
  let component: PassengersInfoCardComponent;
  let fixture: ComponentFixture<PassengersInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengersInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengersInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
