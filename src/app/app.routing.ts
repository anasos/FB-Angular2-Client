import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './service/auth-guard.service';

import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { SignUpComponent } from './component/sign-up/sign-up.component'

const appRoutes: Routes = [
  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

@NgModule({
imports: [ RouterModule.forRoot(appRoutes) ],
exports: [ RouterModule ]
})
export class AppRoutingModule {}