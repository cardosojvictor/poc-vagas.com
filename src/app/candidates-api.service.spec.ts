import { TestBed, inject } from '@angular/core/testing';

import { CandidatesApiService } from './candidates-api.service';

describe('CandidatesApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatesApiService]
    });
  });

  it('should be created', inject([CandidatesApiService], (service: CandidatesApiService) => {
    expect(service).toBeTruthy();
  }));
});
