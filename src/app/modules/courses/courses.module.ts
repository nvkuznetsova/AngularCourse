import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CoreModule } from '../core/core.module';

import { CourseItemComponent } from './components/course-item/course-item.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { SearchComponent } from './components/search/search.component';
import { CoursesRoutingModule } from './courses-routing.module';

@NgModule({
  declarations: [ CoursesPageComponent, CourseItemComponent, SearchComponent ],
  imports: [
    CommonModule,
    CoursesRoutingModule,
    CoreModule,
    FontAwesomeModule,
    FormsModule,
  ],
})
export class CoursesModule {}
