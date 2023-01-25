import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideInfoCardComponent } from './ride-info-card.component';

describe('RideInfoCardComponent', () => {
  let component: RideInfoCardComponent;
  let fixture: ComponentFixture<RideInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideInfoCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
