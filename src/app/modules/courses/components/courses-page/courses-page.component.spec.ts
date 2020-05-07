import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { courses as coursesMock } from 'src/app/mocks/courses-mock';
import { OrderPipe } from 'src/app/modules/core/pipes/order/order.pipe';
import { SearchPipe } from 'src/app/modules/core/pipes/search/search.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let element: DebugElement;

  const searchPipeSpy = jasmine.createSpyObj('SearchPipe', [ 'transform' ]);
  const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [ 'getCoursesList', 'removeCourse' ]);
  const dialogMock = {
    open: jasmine.createSpy('open').and.returnValue({ afterClosed: () => of(true) }),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialog, useValue: dialogMock },
        { provide: CoursesService, useValue: coursesServiceSpy },
      ],
      declarations: [ CoursesPageComponent, OrderPipe ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .overrideProvider(SearchPipe, { useValue: searchPipeSpy })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesPageComponent);
    component = fixture.componentInstance;
    element = fixture.debugElement;
    coursesServiceSpy.getCoursesList.and.returnValue(coursesMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call `onAddCourse` handler', () => {
    const addCourseSpy = spyOn(component, 'onAddCourse');
    const addBtn = element.query(By.css('[data-marker="add-btn"]')).nativeElement;
    addBtn.click();
    expect(addCourseSpy).toHaveBeenCalled();
  });

  it('should call `onLoadMoreCourses` handler', () => {
    const loadMoreSpy = spyOn(component, 'onLoadMoreCourses');
    const loadMoreBtn = element.query(By.css('[data-marker="load-btn"]')).nativeElement;
    loadMoreBtn.click();
    expect(loadMoreSpy).toHaveBeenCalled();
  });

  it('should call `onEditCourse` handler', () => {
    const course = coursesMock[0];
    const editCourseSpy = spyOn(component, 'onEditCourse');
    const courseCard = element.query(By.css('[data-marker="course"]'));
    courseCard.triggerEventHandler('edit', course);
    expect(editCourseSpy).toHaveBeenCalledWith(course);
  });

  it('should call `onDeleteCourse` handler', () => {
    const courseId = 5;
    const deleteCourseSpy = spyOn(component, 'onDeleteCourse');
    const courseCard = element.query(By.css('[data-marker="course"]'));
    courseCard.triggerEventHandler('delete', courseId);
    expect(deleteCourseSpy).toHaveBeenCalledWith(courseId);
  });

  it('should oped dialog and call service methods on delete', () => {
    const courseId = 2;

    component.onDeleteCourse(courseId);
    expect(dialogMock.open).toHaveBeenCalled();

    dialogMock.open().afterClosed().subscribe(() => {
      expect(coursesServiceSpy.removeCourse).toHaveBeenCalledWith(courseId);
      expect(coursesServiceSpy.getCoursesList).toHaveBeenCalled();
    });
  });

  it('should call `onSearch` handler', () => {
    const input = 'some input';
    const onSearchSpy = spyOn(component, 'onSearch');
    const searchInput = element.query(By.css('[data-marker="search"]'));
    searchInput.triggerEventHandler('search', input);
    expect(onSearchSpy).toHaveBeenCalledWith(input);
  });

  it('should call SearchPipe', () => {
    const input = 'some input';
    component.onSearch(input);
    expect(searchPipeSpy.transform).toHaveBeenCalledWith(component.allCourses, input, 'title');
  });
});
