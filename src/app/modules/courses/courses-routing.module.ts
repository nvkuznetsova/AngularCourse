import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesPageComponent } from './components/courses-page/courses-page.component';

const routes: Routes = [
  { path: 'courses', component: CoursesPageComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class CoursesRoutingModule {}
