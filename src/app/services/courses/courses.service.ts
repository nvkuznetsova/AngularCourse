import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IAuthor } from 'src/app/domain/Author';
import { ICourse } from 'src/app/domain/Course';
import { CourseModel } from 'src/app/model/Course';

import { HandleErrorService } from '../handle-error/handle-error.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private coursesUrl = '/videocourses';
  private authorsUrl = '/authors';
  private coursesCount = 0;

  constructor(private http: HttpClient, private errorHandler: HandleErrorService) { }

  getCoursesList(limit = 5): Observable<Array<CourseModel>> {
    return this.http.get<Array<ICourse>>(`${this.coursesUrl}?_start=0&_limit=${limit}`, { observe: 'response' }).pipe(
      tap(response => {
        if (!this.coursesCount) {
          this.coursesCount = +response.headers.get('x-total-count');
        }
      }),
      map(response => response.body.map((course: ICourse): CourseModel => this.createCourseModel(course))),
      catchError(this.errorHandler.handleError<Array<CourseModel>>()),
    );
  }

  getCourseById(courseId: number): Observable<CourseModel> {
    return this.http.get<ICourse>(`${this.coursesUrl}/${courseId}`).pipe(
      map(course => this.createCourseModel(course)),
      catchError(this.errorHandler.handleError<CourseModel>()),
    );
  }

  getAuthors(): Observable<Array<IAuthor>> {
    return this.http.get<Array<IAuthor>>(this.authorsUrl).pipe(
      catchError(this.errorHandler.handleError<Array<IAuthor>>()),
    );
  }

  searchCourses(input: string): Observable<Array<CourseModel>> {
    return this.http.get<Array<ICourse>>(`${this.coursesUrl}?q=${input}`).pipe(
      map(courses => courses.map((course: ICourse): CourseModel => this.createCourseModel(course))),
      catchError(this.errorHandler.handleError<Array<CourseModel>>()),
    );
  }

  createCourse(course: ICourse): Observable<ICourse> {
    return this.http.post<ICourse>(this.coursesUrl, course).pipe(
      catchError(this.errorHandler.handleError<ICourse>()),
    );
  }

  updateCourse(course: ICourse): Observable<ICourse> {
    return this.http.put<ICourse>(`${this.coursesUrl}/${course.id}`, course).pipe(
      catchError(this.errorHandler.handleError<ICourse>()),
    );
  }

  removeCourse(courseId: number): Observable<ICourse> {
    return this.http.delete<ICourse>(`${this.coursesUrl}/${courseId}`).pipe(
      catchError(this.errorHandler.handleError<ICourse>()),
    );
  }

  getCoursesCount(): number {
    return this.coursesCount;
  }

  private createCourseModel(course: ICourse): CourseModel {
    const { id, title, creationDate, duration, description, topRated, authors  } = course;
    return new CourseModel(id, title, new Date(creationDate), duration, description, topRated, authors);
  }
}
