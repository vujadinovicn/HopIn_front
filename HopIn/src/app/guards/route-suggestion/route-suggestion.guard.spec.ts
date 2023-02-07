import { TestBed } from '@angular/core/testing';

import { RouteSuggestionComponent } from './route-suggestion.guard';

describe('RouteSuggestionGuard', () => {
  let guard: RouteSuggestionComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteSuggestionComponent);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
