import { TestBed } from '@angular/core/testing';

import { NgrxOperatorsService } from './ngrx-operators.service';

describe('NgrxOperatorsService', () => {
  let service: NgrxOperatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxOperatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
