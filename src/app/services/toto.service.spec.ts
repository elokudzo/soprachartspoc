import { TestBed } from '@angular/core/testing';

import { TotoService } from './toto.service';

describe('TotoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TotoService = TestBed.get(TotoService);
    expect(service).toBeTruthy();
  });
});
