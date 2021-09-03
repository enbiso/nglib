import { TestBed } from '@angular/core/testing';

import { UtilsStringService } from './utils-string.service';

describe('UtilsStringService', () => {
  let service: UtilsStringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsStringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
