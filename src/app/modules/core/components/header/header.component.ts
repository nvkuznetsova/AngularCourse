import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  logoText = 'Video Course';
  logoffBtnText = 'Log off';
  isLoggedIn = false;
  userInfo: string;
  user$ = new Subscription();

  constructor(
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.user$.add(this.authService.getUserInfo().subscribe());
    this.user$.add(this.authService.userInfo$.pipe(
      tap(user => {
        this.userInfo = user;
        this.ref.markForCheck();
      })
    ).subscribe());
  }

  ngOnDestroy() {
    this.user$.unsubscribe();
  }

  onLogOff(): void {
    this.authService.logout();
  }

  goToMainPage(): void {
    this.router.navigateByUrl('/courses');
  }

}
