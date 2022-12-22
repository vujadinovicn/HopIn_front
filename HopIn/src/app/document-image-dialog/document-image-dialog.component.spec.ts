import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentImageDialogComponent } from './document-image-dialog.component';

describe('DocumentImageDialogComponent', () => {
  let component: DocumentImageDialogComponent;
  let fixture: ComponentFixture<DocumentImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
