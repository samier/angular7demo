import { TestBed } from '@angular/core/testing';

import { MyToasterService } from './my-toaster.service';

describe('MyToasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyToasterService = TestBed.get(MyToasterService);
    expect(service).toBeTruthy();
  });
});
