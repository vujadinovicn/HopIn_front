import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclePreferencesFormComponent } from './vehicle-preferences-form.component';

describe('VehiclePreferencesFormComponent', () => {
  let component: VehiclePreferencesFormComponent;
  let fixture: ComponentFixture<VehiclePreferencesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclePreferencesFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclePreferencesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
