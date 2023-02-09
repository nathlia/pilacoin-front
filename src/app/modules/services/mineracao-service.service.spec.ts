import { TestBed } from '@angular/core/testing';

import { MineracaoServiceService } from './mineracao-service.service';

describe('MineracaoServiceService', () => {
  let service: MineracaoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MineracaoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
