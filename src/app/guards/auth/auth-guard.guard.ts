import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | UrlTree {
      const loginUrl = this.router.parseUrl('/login');
      return this.authService.isAuthenticated() ? true : loginUrl;
  }

  canActivateChild(): boolean | UrlTree {
    return this.canActivate();
}

}
