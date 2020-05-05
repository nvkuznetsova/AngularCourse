import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { courses } from 'src/app/mocks/courses-mock';
import { CourseModel } from 'src/app/model/Course';
import { SearchPipe } from 'src/app/modules/core/pipes/search/search.pipe';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: [ './courses-page.component.scss' ],
  providers: [ SearchPipe ],
})
export class CoursesPageComponent implements OnInit,
OnChanges,
AfterContentInit,
AfterContentChecked,
AfterViewInit,
AfterViewChecked {
  loadBtnText = 'Load more';
  addBtnText = 'Add course';
  emptyCoursesMessage = 'No data. Feel free to add new course';
  faPlus = faPlus;
  courses: Array<CourseModel>;
  allCourses: Array<CourseModel>;

  constructor(private searchPipe: SearchPipe) { }

  ngOnChanges(): void {
    console.log('OnChanges called');
  }

  ngOnInit() {
    this.courses = courses;
    this.allCourses = courses;
  }

  ngAfterContentInit(): void {
    console.log('AfterContentInit called');
  }

  ngAfterContentChecked(): void {
    console.log('AfterContentChecked called');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit called');
  }

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked called');
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

  onSearch(input: string): void {
    this.courses = this.searchPipe.transform(this.allCourses, input, 'title') as Array<CourseModel>;
  }

}
