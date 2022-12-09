import { TestBed } from '@angular/core/testing';

import { PoeResolver } from './poe.resolver';

describe('PoeResolver', () => {
  let resolver: PoeResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PoeResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
