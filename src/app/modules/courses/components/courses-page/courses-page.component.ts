import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import { CourseModel } from 'src/app/model/Course';
import { ConfirmModalComponent } from 'src/app/modules/core/components/confirm-modal/confirm-modal.component';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: [ './courses-page.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesPageComponent implements OnInit, OnDestroy {
  loadBtnText = 'Load more';
  addBtnText = 'Add course';
  emptyCoursesMessage = 'No data. Feel free to add new course';
  faPlus = faPlus;
  courses: Array<CourseModel> = [];
  sub$ = new Subscription();
  isLoading: boolean;

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.sub$.add(this.getAllCourses().subscribe());
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  getAllCourses(limit?: number): Observable<Array<CourseModel>> {
    return this.coursesService.getCoursesList(limit).pipe(
      tap(courses => {
        this.courses = courses;
        this.isLoading = false;
        this.ref.markForCheck();
      })
    );
  }

  onAddCourse(): void {
    this.router.navigateByUrl('/courses/new');
  }

  onLoadMoreCourses(): void {
    const limit = this.courses.length + 5;
    this.isLoading = true;
    this.sub$.add(this.getAllCourses(limit).subscribe());
  }

  onEditCourse(courseId: number): void {
    this.router.navigateByUrl(`/courses/${courseId}`);
  }

  onDeleteCourse(course: { courseId: number, title: string }): void {
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

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          this.isLoading = true;
          this.ref.markForCheck();
          return this.coursesService.removeCourse(course.courseId).pipe(
            concatMap(() => this.getAllCourses(this.courses.length))
          );
        }
      })
    ).subscribe();
  }

  onSearch(input: string): void {
    this.sub$.add(this.coursesService.searchCourses(input.toLowerCase()).pipe(
      tap(courses => {
        this.courses = courses;
        this.isLoading = false;
        this.ref.markForCheck();
      })
    ).subscribe());
  }

}
