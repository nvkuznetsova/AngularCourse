import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { DurarionPipe } from './pipes/duration/durarion.pipe';
import { OrderPipe } from './pipes/order/order.pipe';
import { SearchPipe } from './pipes/search/search.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    DurarionPipe,
    OrderPipe,
    SearchPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    DurarionPipe,
    OrderPipe,
    SearchPipe,
  ],
})
export class CoreModule { }
