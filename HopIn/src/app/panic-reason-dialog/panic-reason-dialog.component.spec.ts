import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanicReasonDialogComponent } from './panic-reason-dialog.component';

describe('PanicReasonDialogComponent', () => {
  let component: PanicReasonDialogComponent;
  let fixture: ComponentFixture<PanicReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanicReasonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanicReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
