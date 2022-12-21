import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDocumentsComponent } from './change-documents.component';

describe('ChangeDocumentsComponent', () => {
  let component: ChangeDocumentsComponent;
  let fixture: ComponentFixture<ChangeDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeDocumentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
