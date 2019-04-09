import { TestBed } from '@angular/core/testing';

import { MessageDetailResolverService } from './message-detail-resolver.service';

describe('MessageDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MessageDetailResolverService = TestBed.get(MessageDetailResolverService);
    expect(service).toBeTruthy();
  });
});
