import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../core/material.module';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';


@NgModule({
  declarations: [ LoginComponent ],
  imports: [
    CommonModule,
    MaterialModule,
    LoginRoutingModule,
  ],
})
export class LoginModule { }
