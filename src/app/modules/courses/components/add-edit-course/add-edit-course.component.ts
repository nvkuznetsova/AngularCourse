import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseModel } from 'src/app/model/Course';
import { CoursesService } from 'src/app/services/courses/courses.service';

function validateAuthors(control: AbstractControl): { validateAuthors: { valid: boolean } } | null {
  return control.value.length ? null : {
    validateAuthors: { valid: false },
  };
}

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: [ './add-edit-course.component.scss' ],
})
export class AddEditCourseComponent implements OnInit, OnDestroy {
  pageHeader: string;
  course: CourseModel;
  isEditMode: boolean;
  courseForm: FormGroup;
  sub$ = new Subscription();

  requiredError = 'This field is required';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.createform();
    this.isEditMode = this.route.snapshot.paramMap.has('id');
    this.pageHeader = this.isEditMode ? 'Edit course' : 'New course';
    if (this.isEditMode) {
      const courseId = +this.route.snapshot.paramMap.get('id');
      this.sub$.add(this.coursesService.getCourseById(courseId).pipe(
        tap(vc => {
          this.course = vc;
          this.courseForm.patchValue(vc);
        })
        ).subscribe());
      }
  }

  ngOnDestroy() {
    if (this.sub$) {
      this.sub$.unsubscribe();
    }
  }

  get authors(): AbstractControl {
    return this.courseForm.get('authors');
  }

  get title(): AbstractControl {
    return this.courseForm.get('title');
  }

  get description(): AbstractControl {
    return this.courseForm.get('description');
  }

  get creationDate(): AbstractControl {
    return this.courseForm.get('creationDate');
  }

  get duration(): AbstractControl {
    return this.courseForm.get('duration');
  }

  goToMainPage(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(): void {
    const course = this.courseForm.value;
    if (!this.isEditMode) {
      this.sub$.add(this.coursesService.createCourse(course).subscribe(() => this.goToMainPage()));
    } else {
      const updatedCourse = { ...this.course, ...course };
      this.sub$.add(this.coursesService.updateCourse(updatedCourse).subscribe(() => this.goToMainPage()));
    }
  }

  isFormInvalid(): boolean {
    return this.courseForm.invalid;
  }

  private createform(): void {
    this.courseForm = this.fb.group({
      title: [ '', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
      ]) ],
      description: [ '', Validators.compose([
        Validators.required,
        Validators.maxLength(500),
      ]) ],
      creationDate: [ '', Validators.required ],
      duration: [ '', Validators.compose([
        Validators.required,
        Validators.pattern(/\d+/),
      ]) ],
      authors: [ [], validateAuthors ],
    });
  }

}
