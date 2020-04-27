import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { courses } from 'src/app/mocks/courses-mock';

import { CoursesPageComponent } from './courses-page.component';

describe('CoursesPageComponent', () => {
  let component: CoursesPageComponent;
  let fixture: ComponentFixture<CoursesPageComponent>;
  let element: DebugElement;

  const coursesMock = courses;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesPageComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
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
});
