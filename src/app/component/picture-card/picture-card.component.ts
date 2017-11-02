import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlbumComponent } from '../album/album.component'
import { Album } from '../../model/album'
import { FacePicture } from '../../model/facePicture'
import { AlbumService } from '../../service/album.service'
import { MatCardModule } from '@angular/material';

@Component({
  selector: 'picture-card',
  templateUrl:`./picture-card.html`,
  styleUrls: [`./picture-card.css`]
})

export class PictureCardComponent {
	@Input() picture: FacePicture;
}