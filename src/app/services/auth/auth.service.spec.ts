import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { UserModel } from 'src/app/model/User';

import { HandleErrorService } from '../handle-error/handle-error.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authServide: AuthService;
  let httpTestingController: HttpTestingController;

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
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(authServide).toBeTruthy();
  });

  it('should login user', () => {
    const email = 'user@email.com';
    const password = 'qwerty';
    const user = new UserModel(1, 'user', 'user', email);

    authServide.login(email, password)
      .subscribe(res => expect(res).toEqual(user));

    const req = httpTestingController.expectOne(`/users?email=${email}&password=${password}`);
    expect(req.request.method).toBe('GET');
    req.flush(user);
  });

  it('should return user info', () => {
    const token = 'Token';
    const response = {
      id: 1,
      firstName: 'user',
      lastName: 'user',
      fakeToken: 'Token',
      email: 'user@email.com',
    };

    const user = new UserModel(1, 'user', 'user', 'user@email.com');
    spyOn(localStorage, 'getItem').and.callFake(key => key);

    authServide.getUserInfo()
      .subscribe(res => expect(res).toEqual(user));
    authServide.userInfo$
      .subscribe(userInfo => expect(userInfo).toEqual(user.getLogin()));

    const req = httpTestingController.expectOne(`/users?fakeToken=${token}`);
    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should logout user', () => {
    spyOn(localStorage, 'removeItem');
    authServide.logout();

    expect(localStorage.removeItem).toHaveBeenCalledWith('Token');
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return auth status', () => {
    spyOn(localStorage, 'getItem').and.callFake(key => key);
    authServide.isAuthenticated();

    expect(localStorage.getItem).toHaveBeenCalledWith('Token');
  });

});
