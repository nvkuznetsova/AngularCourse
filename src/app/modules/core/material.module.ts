import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  exports: [
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
  ],
})
export class MaterialModule { }
