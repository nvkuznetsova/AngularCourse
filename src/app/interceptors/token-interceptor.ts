import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth/auth.service';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private loaderService: LoaderService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let processedReq;

    this.showLoader();

    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('Token');
      processedReq = req.clone({
        headers: req.headers.append('Authorization', token),
      });
    } else {
      processedReq = req.clone();
    }

    return next.handle(processedReq).pipe(
      delay(500),
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.hideLoader();
        }
      },
      (_: any) => this.hideLoader())
    );
  }

  private showLoader(): void {
    this.loaderService.show();
  }
  private hideLoader(): void {
    this.loaderService.hide();
  }

}
