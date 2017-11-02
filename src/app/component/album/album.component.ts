import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'app/model/album'

@Component({
  selector: 'album-detail',
  templateUrl:`./album.html`
})

export class AlbumComponent {
	@Input() album: Album;
}