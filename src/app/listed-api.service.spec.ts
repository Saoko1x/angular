import { TestBed } from '@angular/core/testing';

import { ListedApiService } from './listed-api.service';

describe('ListedApiService', () => {
  let service: ListedApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListedApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
