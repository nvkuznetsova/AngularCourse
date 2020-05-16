import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  loginHeaderText = 'Login';
  resetPasswordText = 'Forgot password?';
  loginLabel = 'Login';
  email: string;
  password: string;
  sub$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  onLogin(): void {
    if (!this.email || !this.password) {
      return;
    }
    this.sub$ = this.authService.login(this.email, this.password).pipe(
      tap(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl('/courses');
        }
      })
    ).subscribe();
  }

}
