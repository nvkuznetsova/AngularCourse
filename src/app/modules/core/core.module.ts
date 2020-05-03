import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ConfirmModalComponent } from './components/confirm-modal/confirm-modal.component';
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
    ConfirmModalComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
  exports: [
    BreadcrumbsComponent,
    FooterComponent,
    HeaderComponent,
    DurarionPipe,
    OrderPipe,
    SearchPipe,
  ],
  entryComponents: [
    ConfirmModalComponent,
  ],
})
export class CoreModule { }
