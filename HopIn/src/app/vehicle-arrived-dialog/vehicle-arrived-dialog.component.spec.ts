import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleArrivedDialogComponent } from './vehicle-arrived-dialog.component';

describe('VehicleArrivedDialogComponent', () => {
  let component: VehicleArrivedDialogComponent;
  let fixture: ComponentFixture<VehicleArrivedDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleArrivedDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleArrivedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
