import { TestBed } from '@angular/core/testing';

import { GItemService } from './g-item.service';

describe('GItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GItemService = TestBed.get(GItemService);
    expect(service).toBeTruthy();
  });
});
