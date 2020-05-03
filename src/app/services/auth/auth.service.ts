import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new UserModel(123, 'Bilbo', 'Baggins', 'baggins@gmail.com');

  constructor() { }

  login(): void {
    this.user.isAuthenticated = true;
    localStorage.setItem(String(this.user.id), JSON.stringify(this.user));
  }

  logout(): void {
    this.user.isAuthenticated = false;
    localStorage.removeItem(String(this.user.id));
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem(String(this.user.id));
    return user ? JSON.parse(user).isAuthenticated : false;
  }

  getUserInfo(): string {
    return this.user.getLogin();
  }
}
