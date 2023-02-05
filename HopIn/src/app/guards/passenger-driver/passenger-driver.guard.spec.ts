import { TestBed } from '@angular/core/testing';

import { PassengerDriverGuard } from './passenger-driver.guard';

describe('PassengerDriverGuard', () => {
  let guard: PassengerDriverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PassengerDriverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
