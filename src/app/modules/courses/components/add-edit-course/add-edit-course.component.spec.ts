import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { course } from 'src/app/mocks/courses-mock';
import { CoursesService } from 'src/app/services/courses/courses.service';

import { AddEditCourseComponent } from './add-edit-course.component';

describe('AddEditCourseComponent', () => {
  let component: AddEditCourseComponent;
  let fixture: ComponentFixture<AddEditCourseComponent>;

  const routeMock = {
    snapshot: {
      paramMap: convertToParamMap({
        id: 3,
      }),
    },
  };
  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
  };
  const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [ 'getCourseById', 'createCourse' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: routeMock },
      ],
      declarations: [ AddEditCourseComponent ],
      imports: [ FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCourseComponent);
    component = fixture.componentInstance;
    coursesServiceSpy.getCourseById.and.returnValue(of(course));
    coursesServiceSpy.createCourse.and.returnValue(of(null));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to courses page on `goToMainPage`', () => {
    component.goToMainPage();
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/courses');
  });

  it('should save course', () => {
    component.isEditMode = false;
    component.onSave(course);
    expect(coursesServiceSpy.createCourse).toHaveBeenCalled();
  });
});
