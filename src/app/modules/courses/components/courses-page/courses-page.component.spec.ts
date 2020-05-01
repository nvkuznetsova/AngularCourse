import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { courses } from 'src/app/mocks/courses-mock';
import { OrderPipe } from 'src/app/modules/core/pipes/order/order.pipe';
import { SearchPipe } from 'src/app/modules/core/pipes/search/search.pipe';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let element: DebugElement;

  const coursesMock = courses;
  const searchPipeSpy = jasmine.createSpyObj('SearchPipe', [ 'transform' ]);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
    expect(searchPipeSpy.transform).toHaveBeenCalledWith(courses, input, 'title');
  });
});
