import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit, DoCheck {
  logoText = 'Video Course';
  logoffBtnText = 'Log off';
  isLoggedIn = false;
  userInfo: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  // TODO need to remove after guards implementation
  ngDoCheck() {
    this.setUserInfo();
  }

  ngOnInit() {
    this.setUserInfo();
  }

  onLogOff(): void {
    this.authService.logout();
    this.setUserInfo();
    this.router.navigateByUrl('/login');
  }

  setUserInfo() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userInfo = this.authService.getUserInfo();
  }

}
