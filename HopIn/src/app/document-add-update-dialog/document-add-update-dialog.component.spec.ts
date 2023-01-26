import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddUpdateDialogComponent } from './document-add-update-dialog.component';

describe('DocumentAddUpdateDialogComponent', () => {
  let component: DocumentAddUpdateDialogComponent;
  let fixture: ComponentFixture<DocumentAddUpdateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentAddUpdateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentAddUpdateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
