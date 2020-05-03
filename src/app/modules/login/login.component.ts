import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginHeaderText = 'Login';
  resetPasswordText = 'Forgot password?';
  loginLabel = 'Login';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  onLogin(): void {
    this.authService.login();
    if (this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/courses');
    }
  }

}
