import { TestBed } from '@angular/core/testing';

import { UserProfileHttpService } from './user-profile-http.service';

describe('UserProfileHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserProfileHttpService = TestBed.get(UserProfileHttpService);
    expect(service).toBeTruthy();
  });
});
