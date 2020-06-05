import { TestBed } from '@angular/core/testing';

import { ChatGroupLinkInvHttpService } from './chat-group-link-inv-http.service';

describe('ChatGroupLinkInvHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupLinkInvHttpService = TestBed.get(ChatGroupLinkInvHttpService);
    expect(service).toBeTruthy();
  });
});
