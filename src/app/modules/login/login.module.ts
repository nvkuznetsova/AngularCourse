import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../core/material.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    LoginRoutingModule,
  ],
})
export class LoginModule { }
