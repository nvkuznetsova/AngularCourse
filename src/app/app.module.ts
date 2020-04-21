import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesModule } from './modules/courses/courses.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
