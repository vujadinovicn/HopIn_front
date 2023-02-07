import { TestBed } from '@angular/core/testing';

import { PassengerGuard } from './passenger.guard';

describe('PassengerGuard', () => {
  let guard: PassengerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PassengerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
