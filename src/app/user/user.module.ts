import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup/signup/signup.component';
import { RouterModule } from '@angular/router';
import { GoogleTokenFormComponent } from './google/google-token-form/google-token-form.component';



@NgModule({
  declarations: [
    LoginFormComponent,
    SignupComponent,
    GoogleTokenFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class UserModule { }
