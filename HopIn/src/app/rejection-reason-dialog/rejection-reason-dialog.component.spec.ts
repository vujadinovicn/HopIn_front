import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReejctionReasonDialogComponent } from './rejection-reason-dialog.component';

describe('ReejctionReasonDialogComponent', () => {
  let component: ReejctionReasonDialogComponent;
  let fixture: ComponentFixture<ReejctionReasonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReejctionReasonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReejctionReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
