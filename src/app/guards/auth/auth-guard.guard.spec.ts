import { inject, TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { AuthGuard } from './auth-guard.guard';

describe('AuthGuardGuard', () => {
  const authServiceSpy = jasmine.createSpyObj('AuthService', [ 'isAuthenticated' ]);
  const mockRouter = {
    parseUrl: jasmine.createSpy('parseUrl'),
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });
  });

  afterEach(() => authServiceSpy.isAuthenticated.calls.reset());

  it('should create', inject([ AuthGuard ], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should return true if navigation allowed', inject([ AuthGuard ], (guard: AuthGuard) => {
    authServiceSpy.isAuthenticated.and.returnValue(true);
    guard.canActivate().subscribe(res => {
      expect(res).toBeTruthy();
    });
    guard.canActivateChild().subscribe(res => {
      expect(res).toBeTruthy();
    });
  }));

  it('should redirect to login if navigation allowed', inject([ AuthGuard ], (guard: AuthGuard) => {
    const mockResult = {} as UrlTree;
    authServiceSpy.isAuthenticated.and.returnValue(false);
    mockRouter.parseUrl.and.returnValue(mockResult);
    guard.canActivate().subscribe(res => {
      expect(res).toBe(mockResult);
    });
    guard.canActivateChild().subscribe(res => {
      expect(res).toBe(mockResult);
    });
  }));
});
