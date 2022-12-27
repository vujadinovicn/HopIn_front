import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentAddDialogComponent } from './document-add-dialog.component';

describe('DocumentAddDialogComponent', () => {
  let component: DocumentAddDialogComponent;
  let fixture: ComponentFixture<DocumentAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
