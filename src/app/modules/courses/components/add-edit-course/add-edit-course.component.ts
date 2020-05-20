import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ICourse } from 'src/app/domain/Course';
import { CourseModel } from 'src/app/model/Course';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: [ './add-edit-course.component.scss' ],
})
export class AddEditCourseComponent implements OnInit, OnDestroy {
  pageHeader: string;
  course: CourseModel;
  isEditMode: boolean;
  sub$ = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
  ) { }

  ngOnInit() {
    this.isEditMode = this.route.snapshot.paramMap.has('id');
    this.pageHeader = this.isEditMode ? 'Edit course' : 'New course';
    if (this.isEditMode) {
      const courseId = +this.route.snapshot.paramMap.get('id');
      this.sub$.add(this.coursesService.getCourseById(courseId).pipe(
        tap(vc => this.course = vc)
      ).subscribe());
    }
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  goToMainPage(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(course: ICourse): void {
    if (!this.isEditMode) {
      this.sub$.add(this.coursesService.createCourse(course).subscribe());
    }

    this.goToMainPage();
  }

}
