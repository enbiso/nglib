import { TestBed } from '@angular/core/testing';

import { UtilsUrlService } from './utils-url.service';

describe('UtilsUrlService', () => {
  let service: UtilsUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
