import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerAccountSettingsComponent } from './passenger-account-settings.component';

describe('PassengerAccountSettingsComponent', () => {
  let component: PassengerAccountSettingsComponent;
  let fixture: ComponentFixture<PassengerAccountSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassengerAccountSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PassengerAccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
