import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { CoursesModule } from './modules/courses/courses.module';
import { LoginModule } from './modules/login/login.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CoursesModule,
    LoginModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
