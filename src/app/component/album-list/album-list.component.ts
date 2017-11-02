import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlbumComponent } from '../album/album.component'
import { Album } from '../../model/album'
import { AlbumService } from '../../service/album.service'

@Component({
  selector: 'albums-list',
  templateUrl:`./album-list.html`,
  styleUrls: [`./album-list.css`]
})

export class AlbumListComponent {
	@Input() albums: Album[];

	constructor(private albumService: AlbumService) { }
	//let albums = localStorage.getItem('albums');

	getAlbums(){
		this.albums = this.albumService.getAlbums();
	}

	ngOnInit(): void {
		this.getAlbums();
  	}
}