import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideCanceledDialogComponent } from './ride-canceled-dialog.component';

describe('RideCanceledDialogComponent', () => {
  let component: RideCanceledDialogComponent;
  let fixture: ComponentFixture<RideCanceledDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideCanceledDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RideCanceledDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
