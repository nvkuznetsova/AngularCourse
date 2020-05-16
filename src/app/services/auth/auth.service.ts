import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { IUser } from 'src/app/domain/User';
import { UserModel } from 'src/app/model/User';

import { HandleErrorService } from '../handle-error/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<string>();
  userInfo$ = this.user.asObservable();
  private usersUrl = '/users';

  constructor(
    private http: HttpClient,
    private errorHandler: HandleErrorService,
    private router: Router,
  ) { }

  login(userEmail: string, password: string): Observable<any> {
    return this.http.get(`${this.usersUrl}?email=${userEmail}&password=${password}`).pipe(
      tap((user: Array<IUser>) => {
        localStorage.setItem('Token', user[0]['fakeToken']);
      }),
      switchMap(() => this.getUserInfo()),
      catchError(this.errorHandler.handleError()),
    );
  }

  logout(): void {
    localStorage.removeItem('Token');
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('Token');
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('Token') || null;
    return this.http.get(`${this.usersUrl}?fakeToken=${token}`).pipe(
      map((user: Array<IUser>) => {
        if (!user.length) {
          throw Error('User not found!');
        }
        const { id, firstName, lastName, email } = user[0];
        const currentUser = new UserModel(id, firstName, lastName, email);
        this.user.next(currentUser.getLogin());
      }),
      catchError(this.errorHandler.handleError<string>()),
    );
  }
}
