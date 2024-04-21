import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineRequestReasonDialogComponent } from './decline-request-reason-dialog.component';

describe('DeclineRequestReasonDialogComponent', () => {
  let component: DeclineRequestReasonDialogComponent;
  let fixture: ComponentFixture<DeclineRequestReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineRequestReasonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeclineRequestReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
