import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteSuggestionDetailsComponent } from './route-suggestion-details.component';

describe('RouteSuggestionDetailsComponent', () => {
  let component: RouteSuggestionDetailsComponent;
  let fixture: ComponentFixture<RouteSuggestionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteSuggestionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RouteSuggestionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
