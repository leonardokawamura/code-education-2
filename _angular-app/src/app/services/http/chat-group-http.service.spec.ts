import { TestBed } from '@angular/core/testing';

import { ChatGroupHttpService } from './chat-group-http.service';

describe('ChatGroupHttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChatGroupHttpService = TestBed.get(ChatGroupHttpService);
    expect(service).toBeTruthy();
  });
});
