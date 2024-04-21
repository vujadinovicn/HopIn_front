import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailsDialogComponent } from './document-details-dialog.component';

describe('DocumentDetailsDialogComponent', () => {
  let component: DocumentDetailsDialogComponent;
  let fixture: ComponentFixture<DocumentDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentDetailsDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
