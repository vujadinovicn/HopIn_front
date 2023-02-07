import { TestBed } from '@angular/core/testing';

import { RegisteredUserGuard } from './registered-user.guard';

describe('RegisteredUserGuard', () => {
  let guard: RegisteredUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RegisteredUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
