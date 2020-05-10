import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { course } from 'src/app/mocks/courses-mock';
import { CourseModel } from 'src/app/model/Course';
import { CoursesService } from 'src/app/services/courses/courses.service';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: [ './add-edit-course.component.scss' ],
})
export class AddEditCourseComponent implements OnInit {
  pageHeader: string;
  course: CourseModel;
  isEditMode: boolean;

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
      this.course = this.coursesService.getCourseById(courseId);
      console.log(this.course);
    }
  }

  goToMainPage(): void {
    this.router.navigateByUrl('/courses');
  }

  onSave(): void {
    if (!this.isEditMode) {
      this.coursesService.createCourse(course);
    }

    this.goToMainPage();
  }

}
