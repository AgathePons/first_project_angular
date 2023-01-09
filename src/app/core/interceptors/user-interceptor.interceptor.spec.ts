import { TestBed } from '@angular/core/testing';

import { UserInterceptorService } from './user-interceptor.interceptor';

describe('UserInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      UserInterceptorService
      ]
  }));

  it('should be created', () => {
    const interceptor: UserInterceptorService = TestBed.inject(UserInterceptorService);
    expect(interceptor).toBeTruthy();
  });
});
