import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceSpy = jasmine.createSpyObj('AuthService', [ 'login', 'isAuthenticated' ]);
  const routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  const snackBerSpy = { open: jasmine.createSpy('open') };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBerSpy },
      ],
      declarations: [ LoginComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => authServiceSpy.login.calls.reset());

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user and redirect to courses page on login', () => {
    component.loginForm.controls['email'].setValue('email@email.com');
    component.loginForm.controls['password'].setValue('password');
    fixture.detectChanges();
    authServiceSpy.isAuthenticated.and.returnValue(true);
    authServiceSpy.login.and.returnValue(of(null));

    component.onLogin();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/courses');
  });

  it('should login user and redirect to courses page on login', () => {
    authServiceSpy.login.and.returnValue(throwError('Error'));

    component.onLogin();
    expect(snackBerSpy.open).toHaveBeenCalled();
  });
});
