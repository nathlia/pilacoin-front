import { TestBed } from '@angular/core/testing';

import { BlocoServiceService } from './bloco-service.service';

describe('BlocoServiceService', () => {
  let service: BlocoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BlocoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
