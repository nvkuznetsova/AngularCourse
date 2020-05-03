import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {
  title = 'videocourse';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigateByUrl('/login');
    }

  }
}
