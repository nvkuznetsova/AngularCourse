import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  const authServiceSpy = jasmine.createSpyObj('AuthService', [ 'logout', 'isAuthenticated', 'getUserInfo' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [ HeaderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses page on `goToMainPage`', () => {
    component.goToMainPage();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/courses');
  });

  it('should log out user', () => {
    component.onLogOff();
    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
