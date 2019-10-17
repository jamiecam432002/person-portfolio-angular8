import { TestBed } from '@angular/core/testing';

import { FItemService } from './fitem.service';

describe('FItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FItemService = TestBed.get(FItemService);
    expect(service).toBeTruthy();
  });
});
