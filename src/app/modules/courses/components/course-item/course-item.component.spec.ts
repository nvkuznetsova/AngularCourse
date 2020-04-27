import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { course } from 'src/app/mocks/courses-mock';

import { CourseItemComponent } from './course-item.component';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let element: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = course;
    element = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit course when `onEdit` handler called', () => {
    const emitSpy = spyOn(component.edit, 'emit');
    const onEditSpy = spyOn(component, 'onEdit').and.callThrough();
    const editBtn = element.query(By.css('[data-marker="edit-btn"]')).nativeElement;
    editBtn.click();
    expect(onEditSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(component.course);
  });

  it('should emit course when `onDelete` handler called', () => {
    const emitSpy = spyOn(component.delete, 'emit');
    const onDeleteSpy = spyOn(component, 'onDelete').and.callThrough();
    const deleteBtn = element.query(By.css('[data-marker="delete-btn"]')).nativeElement;
    deleteBtn.click();
    expect(onDeleteSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(component.course.id);
  });
});
