import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HighlightCourseDirective } from './highlight-course.directive';
import { TestComponent } from './test-component';

describe('HighlightCourseDirective', () => {
  let element: DebugElement;

  beforeEach(() => {
    const fixture = TestBed.configureTestingModule({
      declarations: [ HighlightCourseDirective, TestComponent ],
    })
    .createComponent(TestComponent);
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should highlight border with green color if course is fresh', () => {
    const freshCourse = element.query(By.css('[data-marker="green-border"]')).nativeElement;
    expect(freshCourse.style.border).toBe('1px solid rgb(155, 200, 55)');
  });

  it('should highlight border with blue color if course is upcoming', () => {
    const upcomingCourse = element.query(By.css('[data-marker="blue-border"]')).nativeElement;
    expect(upcomingCourse.style.border).toBe('1px solid rgb(48, 182, 221)');
  });

  it('should be no border in other cases', () => {
    const noBorderCourse = element.query(By.css('[data-marker="no-border"]')).nativeElement;
    expect(noBorderCourse.style.border).toBe('');
  });
});
