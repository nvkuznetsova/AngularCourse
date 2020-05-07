import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { CourseModel } from 'src/app/model/Course';
import { ConfirmModalComponent } from 'src/app/modules/core/components/confirm-modal/confirm-modal.component';
import { SearchPipe } from 'src/app/modules/core/pipes/search/search.pipe';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: [ './courses-page.component.scss' ],
  providers: [ SearchPipe ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(
    private searchPipe: SearchPipe,
    private coursesService: CoursesService,
    private dialog: MatDialog,
  ) { }

  ngOnChanges(): void {
    console.log('OnChanges called');
  }

  ngOnInit() {
    this.getAllCourses();
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

  getAllCourses(): void {
    const courses = this.coursesService.getCoursesList();
    this.courses = courses;
    this.allCourses = courses;
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
    const course = this.allCourses.find((item: CourseModel) => item.id === courseId);
    const dialogData = {
      title: 'Delete course?',
      message: `Are you sure you want to delete ${course.title}?`,
      confirmLabel: 'Yes, delete',
    };

    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      data: dialogData,
      hasBackdrop: true,
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.removeCourse(courseId);
        this.getAllCourses();
      }
    });
  }

  onSearch(input: string): void {
    this.courses = this.searchPipe.transform(this.allCourses, input, 'title') as Array<CourseModel>;
  }

}
