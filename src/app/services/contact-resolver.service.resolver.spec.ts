import { TestBed } from '@angular/core/testing';

import { ContactResolver.ServiceResolver } from './contact-resolver.service.resolver';

describe('ContactResolver.ServiceResolver', () => {
  let resolver: ContactResolver.ServiceResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContactResolver.ServiceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
