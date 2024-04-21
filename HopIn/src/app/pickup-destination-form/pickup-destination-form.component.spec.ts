import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDestinationFormComponent } from './pickup-destination-form.component';

describe('PickupDestinationFormComponent', () => {
  let component: PickupDestinationFormComponent;
  let fixture: ComponentFixture<PickupDestinationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupDestinationFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupDestinationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
