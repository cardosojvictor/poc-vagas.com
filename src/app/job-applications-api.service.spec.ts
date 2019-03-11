import { TestBed, inject } from '@angular/core/testing';

import { JobApplicationsApiService } from './job-applications-api.service';

describe('JobApplicationsApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobApplicationsApiService]
    });
  });

  it('should be created', inject([JobApplicationsApiService], (service: JobApplicationsApiService) => {
    expect(service).toBeTruthy();
  }));
});
