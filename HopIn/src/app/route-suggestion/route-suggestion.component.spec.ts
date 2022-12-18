import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSuggestionComponent } from './route-suggestion.component';

describe('RouteSuggestionComponent', () => {
  let component: RouteSuggestionComponent;
  let fixture: ComponentFixture<RouteSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteSuggestionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
