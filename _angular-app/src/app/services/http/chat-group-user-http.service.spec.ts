import { TestBed } from '@angular/core/testing';

import { ChatGroupUserHttpService } from './chat-group-user-http.service';

describe('ChatGroupUserHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupUserHttpService = TestBed.get(ChatGroupUserHttpService);
    expect(service).toBeTruthy();
  });
});
