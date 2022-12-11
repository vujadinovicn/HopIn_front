import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnregisteredRideFormComponent } from './unregistered-ride-form.component';

describe('UnregisteredRideFormComponent', () => {
  let component: UnregisteredRideFormComponent;
  let fixture: ComponentFixture<UnregisteredRideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnregisteredRideFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnregisteredRideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
