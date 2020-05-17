import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { throwError } from 'rxjs';

import { HandleErrorService } from '../handle-error/handle-error.service';

import { CoursesService } from './courses.service';

describe('CoursesService', () => {
  let coursesService: CoursesService;
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
  });

  it('should be created', () => {
    expect(coursesService).toBeTruthy();
  });
});
