import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

import { HandleErrorService } from '../handle-error/handle-error.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authServide: AuthService;
  const httpErrorHandlerStub = { handleError: () => (err) => throwError(err) };
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HandleErrorService, useValue: httpErrorHandlerStub },
        { provide: Router, useValue: mockRouter },
      ],
      imports: [ HttpClientTestingModule ],
    });

    authServide = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(authServide).toBeTruthy();
  });
});
