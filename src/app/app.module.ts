import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './interceptors/token-interceptor';
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
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
