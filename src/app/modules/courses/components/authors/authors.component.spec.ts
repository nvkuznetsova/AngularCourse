import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { CoursesService } from 'src/app/services/courses/courses.service';

import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';

import { AuthorsComponent } from './authors.component';

describe('AuthorsComponent', () => {
  let component: AuthorsComponent;
  let fixture: ComponentFixture<AuthorsComponent>;

  const author = { id: '5b7a846290d6ff6894377fb5', name: 'Decker Albert' };
  const authors = new FormControl([]);
  const coursesServiceSpy = jasmine.createSpyObj('CoursesService', [ 'getAuthors' ]);
  coursesServiceSpy.getAuthors.and.returnValue(of([ author ]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CoursesService, useValue: coursesServiceSpy },
      ],
      declarations: [ AuthorsComponent, AddEditCourseComponent ],
      imports: [ MatAutocompleteModule ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorsComponent);
    component = fixture.componentInstance;
    component.control = authors;
    component.allAuthors = [ author ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should remove author', () => {
    component.control.setValue([ author ]);
    fixture.detectChanges();

    component.removeAuthor(author.id);
    expect(component.control.value).toEqual([]);
  });

  it('should select author', () => {
    component.selectAuthor({ option: { value: author.id } } as MatAutocompleteSelectedEvent);
    expect(component.control.value).toEqual([ author ]);
  });
});
