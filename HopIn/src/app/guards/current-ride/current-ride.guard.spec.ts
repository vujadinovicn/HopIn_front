import { TestBed } from '@angular/core/testing';

import { CurrentRideGuard } from './current-ride.guard';

describe('CurrentRideGuard', () => {
  let guard: CurrentRideGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CurrentRideGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
