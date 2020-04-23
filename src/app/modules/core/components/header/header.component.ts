import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent implements OnInit {
  logoText = 'Video Course';
  userName = 'User';
  isLoggedIn = false;
  loginBtnText = this.isLoggedIn ? 'Log off' : 'Log in';

  constructor() { }

  ngOnInit() {
  }

}
