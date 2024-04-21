import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRegisterPersonalInfoComponent } from './driver-register-personal-info.component';

describe('DriverRegisterPersonalInfoComponent', () => {
  let component: DriverRegisterPersonalInfoComponent;
  let fixture: ComponentFixture<DriverRegisterPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverRegisterPersonalInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverRegisterPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
