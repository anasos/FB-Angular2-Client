import { Injectable } from '@angular/core';
import { Album } from '../model/album'
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlbumService {

  	constructor() { }

	// private headers = new Headers({
	//  'Content-Type': 'application/json',
	//  'Authorization': this.authenticationService.getToken()
	//  });

	// private options = new RequestOptions({
	// 	headers: this.headers
	// })

	private heroesUrl = "/api/all";  // URL to web api

	saveAlbums( albums: Album[]) {
		localStorage.setItem('albums',JSON.stringify(albums));	
	}

	getAlbums():Album[]{
		return JSON.parse(localStorage.getItem('albums')) as Album[];	
	}

}