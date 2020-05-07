import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let element: DebugElement;

  const authServiceSpy = jasmine.createSpyObj('AuthService', [ 'login', 'isAuthenticated' ]);
  const routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [ LoginComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call `onLogin` handler', () => {
    const loginSpy = spyOn(component, 'onLogin');
    const loginBtn = element.query(By.css('[data-marker="btn-login"]')).nativeElement;
    loginBtn.click();
    expect(loginSpy).toHaveBeenCalledWith();
  });

  it('should login user and redirect to courses page on login', () => {
    authServiceSpy.isAuthenticated.and.returnValue(true);

    component.onLogin();
    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(authServiceSpy.isAuthenticated).toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/courses');
  });
});
