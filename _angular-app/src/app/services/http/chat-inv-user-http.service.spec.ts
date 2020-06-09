import { TestBed } from '@angular/core/testing';

import { ChatInvUserHttpService } from './chat-inv-user-http.service';

describe('ChatInvUserHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatInvUserHttpService = TestBed.get(ChatInvUserHttpService);
    expect(service).toBeTruthy();
  });
});
