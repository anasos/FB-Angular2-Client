import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FacebookModule } from 'ngx-facebook';
import { MatButtonModule, MatCheckboxModule, MatCardModule } from '@angular/material';
import { AppRoutingModule } from "./app.routing";
import { HttpModule }    from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AlbumService } from './service/album.service'
import { AuthGuard } from './service/auth-guard.service';
import { AuthenticationService } from './service/auth.service';
import { MatInputModule } from '@angular/material';

import { AlbumComponent } from './component/album/album.component';
import { AlbumListComponent } from './component/album-list/album-list.component';
import { PictureCardComponent } from './component/picture-card/picture-card.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    AlbumComponent,
    PictureCardComponent,
    LoginComponent,
    HomeComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatToolbarModule,
    FacebookModule.forRoot()
  ],
  providers: [ AlbumService, AuthGuard, AuthenticationService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
