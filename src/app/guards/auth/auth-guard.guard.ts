import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
      const loginUrl = this.router.parseUrl('/login');
      const shouldRedirect = this.authService.isAuthenticated() ? true : loginUrl;
      return of(shouldRedirect);
  }

  canActivateChild(): Observable<boolean | UrlTree> {
    return this.canActivate();
}

}
