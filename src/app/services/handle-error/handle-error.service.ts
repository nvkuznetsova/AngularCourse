import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  handleError<T>() {
    return (errorBody: HttpErrorResponse | Error): Observable<T> => {
      if (errorBody instanceof HttpErrorResponse) {
        let message = '';
        const statusCode: number = errorBody.status;
        switch (statusCode) {
          case 404:
            message = 'Not Found!';
            return throwError(message);
          default:
            message = errorBody.error.message || 'An error occured!';
            return throwError(message);
        }
      } else {
        return throwError(errorBody.message);
      }
    };
  }
}
