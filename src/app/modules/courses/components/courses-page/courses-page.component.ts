import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Observable, Subscription } from 'rxjs';
import { concatMap, debounceTime, distinctUntilChanged, filter, flatMap, switchMap, tap } from 'rxjs/operators';
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
  allCoursesLoadedMessage = 'All courses loaded';
  faPlus = faPlus;
  courses: Array<CourseModel> = [];
  coursesCount: number;
  searchForm: FormGroup;
  private sub$ = new Subscription();

  constructor(
    private coursesService: CoursesService,
    private dialog: MatDialog,
    private router: Router,
    private ref: ChangeDetectorRef,
    private fb: FormBuilder,
  ) {}

  ngOnInit() {
    this.createSearchForm();
    this.sub$.add(this.getAllCourses().subscribe());
    this.sub$.add(this.searchForm.controls['search'].valueChanges.pipe(
      debounceTime(1000),
      filter(text => !!text && text.length >= 3),
      distinctUntilChanged(),
      flatMap((text) => (
        this.coursesService
        .searchCourses(text.toLowerCase())
        .pipe(
          tap((courses) => {
            this.courses = courses;
            this.ref.markForCheck();
          })
        )
      )),
    ).subscribe());
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  getAllCourses(limit?: number): Observable<Array<CourseModel>> {
    return this.coursesService.getCoursesList(limit).pipe(
      tap((courses) => {
        this.courses = courses;
        this.coursesCount = this.coursesService.getCoursesCount();
        this.ref.markForCheck();
      })
    );
  }

  onAddCourse(): void {
    this.router.navigateByUrl('/courses/new');
  }

  onLoadMoreCourses(): void {
    const limit = this.courses.length + 5;
    this.sub$.add(this.getAllCourses(limit).subscribe());
  }

  onEditCourse(courseId: number): void {
    this.router.navigateByUrl(`/courses/${courseId}`);
  }

  onDeleteCourse(course: { courseId: number; title: string }): void {
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

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            this.ref.markForCheck();
            return this.coursesService
              .removeCourse(course.courseId)
              .pipe(concatMap(() => this.getAllCourses(this.courses.length)));
          }
        })
      )
      .subscribe();
  }

  // onSearch(input: string): void {
  //   this.sub$.add(of(input).pipe(
  //     debounceTime(1500),
  //     filter(text => !!text && text.length >= 3),
  //     distinctUntilChanged(),
  //     switchMap((text) => (
  //       this.coursesService
  //       .searchCourses(text.toLowerCase())
  //       .pipe(
  //         tap((courses) => {
  //           this.courses = courses;
  //           this.ref.markForCheck();
  //         })
  //       )
  //     )),
  //   ).subscribe());
  // }

  private createSearchForm() {
    this.searchForm = this.fb.group({
      search: [ '' ],
    });
  }
}
