import { TestBed } from '@angular/core/testing';

import { EntryCacheService } from './entry-cache.service';

describe('EntryCacheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryCacheService = TestBed.get(EntryCacheService);
    expect(service).toBeTruthy();
  });
});
