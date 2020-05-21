import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';
import { course, courses } from 'src/app/mocks/courses-mock';

import { HandleErrorService } from '../handle-error/handle-error.service';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;
  let httpTestingController: HttpTestingController;

  const httpErrorHandlerStub = { handleError: () => (err) => throwError(err) };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        { provide: HandleErrorService, useValue: httpErrorHandlerStub },
      ],
      imports: [ HttpClientTestingModule ],
    });

    coursesService = TestBed.get(CoursesService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });

  it('should get courses', () => {
    coursesService.getCoursesList()
      .subscribe(res => {
        expect(res).toEqual(courses);
      });

    const req = httpTestingController.expectOne('/videocourses?_start=0&_limit=5');
    expect(req.request.method).toBe('GET');
    req.flush(courses);
  });

  it('should get course by id', () => {
    coursesService.getCourseById(course.id)
      .subscribe(res => {
        expect(res).toEqual(course);
      });

    const req = httpTestingController.expectOne(`/videocourses/${course.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(course);
  });

  it('should search course', () => {
    const input = 'some input';
    coursesService.searchCourses(input)
      .subscribe(res => {
        expect(res).toEqual([ course ]);
      });

    const req = httpTestingController.expectOne(`/videocourses?q=${input}`);
    expect(req.request.method).toBe('GET');
    req.flush([ course ]);
  });

  it('should create course', () => {
    coursesService.createCourse(course)
      .subscribe(res => {
        expect(res).toEqual(course);
      });

    const req = httpTestingController.expectOne('/videocourses');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(course);

    const expectedResponse = new HttpResponse({ body: course, status: 201, statusText: 'Created' });
    req.event(expectedResponse);
  });


  it('should update course', () => {
    coursesService.updateCourse(course)
      .subscribe(res => {
        expect(res).toEqual(course);
      });

    const req = httpTestingController.expectOne('/videocourses');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(course);

    const expectedResponse = new HttpResponse({ body: course, status: 204, statusText: 'No Content' });
    req.event(expectedResponse);
  });

  it('should delete course', () => {
    coursesService.removeCourse(course.id)
      .subscribe(res => {
        expect(res).toEqual(course);
      });

    const req = httpTestingController.expectOne(`/videocourses/${course.id}`);
    expect(req.request.method).toBe('DELETE');

    req.flush(course);
  });
});
