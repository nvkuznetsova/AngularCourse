import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../core/material.module';

import { AddEditCourseComponent } from './components/add-edit-course/add-edit-course.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { HighlightCourseDirective } from './directives/highlight-course.directive';

@NgModule({
  declarations: [
    CoursesPageComponent,
    CourseItemComponent,
    SearchComponent,
    HighlightCourseDirective,
    AddEditCourseComponent,
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoreModule,
    FontAwesomeModule,
    FormsModule,
    MaterialModule,
  ],
})
export class CoursesModule {}
