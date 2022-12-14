import { TestBed } from '@angular/core/testing';

import { UserGraphService } from './user-graph.service';

describe('UserGraphService', () => {
  let service: UserGraphService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserGraphService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
