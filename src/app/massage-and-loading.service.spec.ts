import { TestBed } from '@angular/core/testing';

import { MassageAndLoadingService } from './massage-and-loading.service';

describe('MassageAndLoadingService', () => {
  let service: MassageAndLoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MassageAndLoadingService);
  });
});
