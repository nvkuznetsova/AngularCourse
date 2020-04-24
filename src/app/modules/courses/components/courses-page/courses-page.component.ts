import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { courses } from 'src/app/mocks/courses-mock';
import { CourseModel } from 'src/app/model/Course';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: [ './courses-page.component.scss' ],
})
export class CoursesPageComponent implements OnInit {
  loadBtnText = 'Load more';
  addBtnText = 'Add course';
  faPlus = faPlus;
  courses: Array<CourseModel>;

  constructor() { }

  ngOnInit() {
    this.courses = courses;
  }

  onAddCourse(): void {
    console.log('add course');
  }

  onLoadMoreCourses(): void {
    console.log('load button clicked');
  }

  onEditCourse(course: CourseModel): void {
    console.log(course.title);
  }

  onDeleteCourse(courseId: number): void {
    console.log(courseId);
  }

}
