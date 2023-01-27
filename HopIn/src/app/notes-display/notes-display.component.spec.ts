import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDisplayComponent } from './notes-display.component';

describe('NotesDisplayComponent', () => {
  let component: NotesDisplayComponent;
  let fixture: ComponentFixture<NotesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
