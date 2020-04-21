import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [ CoursesPageComponent, CourseItemComponent ],
  imports: [ CommonModule, CoursesRoutingModule ],
})
export class CoursesModule {}
