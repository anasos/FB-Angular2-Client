import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { Album } from './model/album';
import { AlbumService } from './service/album.service'
import { MatButtonModule } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
  }

  title = 'app';
}
