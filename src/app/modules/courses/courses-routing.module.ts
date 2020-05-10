import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth/auth-guard.guard';

import { AddEditCourseComponent } from './components/add-edit-course/add-edit-course.component';
import { CoursesPageComponent } from './components/courses-page/courses-page.component';
import { CoursesComponent } from './courses.component';

const routes: Routes = [
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: CoursesPageComponent,
      },
      {
        path: 'new',
        component: AddEditCourseComponent,
      },
      {
        path: ':id',
        component: AddEditCourseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CoursesRoutingModule {}
