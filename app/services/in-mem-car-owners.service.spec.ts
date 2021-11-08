import { TestBed } from '@angular/core/testing';

import { InMemCarOwnersService } from './in-mem-car-owners.service';

describe('InMemCarOwnersService', () => {
  let service: InMemCarOwnersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemCarOwnersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
