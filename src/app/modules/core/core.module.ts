import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MaterialModule } from './material.module';
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
    ConfirmModalComponent,
    PageNotFoundComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    DurarionPipe,
    OrderPipe,
    SearchPipe,
    MaterialModule,
    LoaderComponent,
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
})
export class CoreModule { }
