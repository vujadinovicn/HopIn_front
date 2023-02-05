import { TestBed } from '@angular/core/testing';

import { RideHistoryDetailsGuard } from './ride-history-details.guard';

describe('RideHistoryDetailsGuard', () => {
  let guard: RideHistoryDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RideHistoryDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
