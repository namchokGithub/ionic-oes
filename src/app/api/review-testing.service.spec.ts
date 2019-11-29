import { TestBed } from '@angular/core/testing';

import { ReviewTestingService } from './review-testing.service';

describe('ReviewTestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewTestingService = TestBed.get(ReviewTestingService);
    expect(service).toBeTruthy();
  });
});
