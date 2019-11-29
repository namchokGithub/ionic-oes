import { TestBed } from '@angular/core/testing';

import { OnlineTestingService } from './online-testing.service';


describe('OnlineTestingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnlineTestingService = TestBed.get(OnlineTestingService);
    expect(service).toBeTruthy();
  });
});
