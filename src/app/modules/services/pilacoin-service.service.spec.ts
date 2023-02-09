import { TestBed } from '@angular/core/testing';

import { PilacoinServiceService } from './pilacoin-service.service';

describe('PilacoinServiceService', () => {
  let service: PilacoinServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilacoinServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
