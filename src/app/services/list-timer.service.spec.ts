import { TestBed } from '@angular/core/testing';

import { ListTimerService } from './list-timer.service';

describe('ListTimerService', () => {
  let service: ListTimerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTimerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
