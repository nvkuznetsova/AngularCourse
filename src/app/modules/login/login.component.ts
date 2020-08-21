import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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
export class LoginComponent implements OnInit, OnDestroy {
  loginHeaderText = 'Login';
  resetPasswordText = 'Forgot password?';
  loginLabel = 'Login';
  loginForm: FormGroup;
  sub$: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  get email(): AbstractControl {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onLogin(): void {
    const { email, password } = this.loginForm.value;
    this.sub$ = this.authService.login(email, password).pipe(
      tap(() => {
        if (this.authService.isAuthenticated()) {
          this.router.navigateByUrl('/courses');
        }
      },
      err => {
        this.openSnackBar(err);
      }
      )
    ).subscribe();
  }

  isFormInvalid(): boolean {
    return this.loginForm.invalid;
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: [ '', Validators.compose([ Validators.required, Validators.email ]) ],
      password: [ '', Validators.required ],
    });
  }

  private openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [ 'snackbar-warn' ],
    });
  }

}
