import { TestBed } from '@angular/core/testing';

import { RouteSuggestionGuard } from './route-suggestion.guard';

describe('RouteSuggestionGuard', () => {
  let guard: RouteSuggestionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteSuggestionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
