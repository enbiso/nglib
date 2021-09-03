import { TestBed } from '@angular/core/testing';

import { NgrxRouteService } from './ngrx-route.service';

describe('NgrxRouteService', () => {
  let service: NgrxRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
