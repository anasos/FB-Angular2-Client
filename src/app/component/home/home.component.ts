import { Component } from '@angular/core';
import { FacebookService, InitParams, LoginResponse, UIParams, UIResponse } from 'ngx-facebook';
import { Album } from '../../model/album';
import { AlbumService } from '../../service/album.service';
import { MatButtonModule } from '@angular/material';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../service/auth.service'

@Component({
  selector: 'home',
  templateUrl: './home.html',
  styleUrls: [`./home.css`]
})
export class HomeComponent {

  private is_logged = true;
  private albums : Album[];
  error = '';

  constructor( private fb: FacebookService, private albumService: AlbumService, 
  	private auth: AuthenticationService, private router:Router ) {

    console.log('Initializing Facebook');
    fb.init({
      appId      : '1947683765444206',
      version    : 'v2.10'
    });
  }


  ngOnInit() { 
    // this.auth.me().then(data => { 
      this.auth.me().then(
        data => {
          this.loginStatus();
        });
    // });;
  }

  loginStatus(){

    this.is_logged = false;
    var myDetails = JSON.parse(localStorage.getItem('myDetails'));
    let facebookToken = myDetails.facebookToken;
    console.log(facebookToken);
    if ( facebookToken ){
      this.fb.api("/debug_token", 'get', {
        input_token: facebookToken,
        access_token: "1947683765444206|Oft5IDsc6IBay0uOk7J8S8YknsY"
      }).then(res => { 
        console.log(res);
        this.is_logged = res.data.is_valid; 
        this.getAlbum();
       });
    }
    //this.fb.getAuthResponse();
  }

  login() {
    var self = this;
    this.fb.login({
      
      enable_profile_selector: true, // allow user to pick what profile to login with
      return_scopes: true, // returns the scopes that the user authorized
      scope: 'public_profile,user_friends,email,pages_show_list,user_birthday,user_photos' // the scopes we want the user to authorize
      
      }).then((res: LoginResponse) => {
        let user_id = res.authResponse.userID;
        //self.getAlbum(user_id);
        localStorage.setItem("input_token",res.authResponse.accessToken);
        localStorage.setItem("userID",res.authResponse.userID);
        this.is_logged = true;
        this.updateFacebookToken(res.authResponse.accessToken);
        this.getFirstAlbum(res.authResponse.accessToken);
      })
  }


  updateFacebookToken(facebookToken: string) {
    this.auth.updateFacebookToken(facebookToken)
        .subscribe(result => {
            if (result === true) {
                // login successful
                console.log("success");

                this.router.navigate(['home']);
            } else {
                // login failed
                console.log("error");
                this.error = 'Username or password is incorrect';
            }
        }, error => {
          this.error = error;
        });
    }

  logout(){
  	this.auth.logout();
  	this.router.navigate(['login']);
  }

  getAlbum() {
    //let url = user_id+'?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source))';
    //let url = '/192200447798051?fields=images';
    var myDetails = JSON.parse(localStorage.getItem('myDetails'));
    let input_token = myDetails.facebookToken;

    let url = 'me?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source))'

    this.fb.api(url,'get',{
      access_token: input_token
    })
      .then(res => { 
        console.log(res);
        let albums = res.albums.data as Album[];
        this.fillAlbum(albums, res.albums.data);
        this.albumService.saveAlbums(albums);
        this.albums = res.albums.data;
      })
      .catch((e: any) => console.error(e));
   
  }



  getFirstAlbum(facebookToken: string) {
    //let url = user_id+'?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source))';
    //let url = '/192200447798051?fields=images';
    var myDetails = JSON.parse(localStorage.getItem('myDetails'));
    let input_token = myDetails.facebookToken;

    let url = 'me?fields=albums.fields(id,name,cover_photo,photos.fields(name,picture,source))'

    this.fb.api(url,'get',{
      access_token: facebookToken
    })
      .then(res => { 
        console.log(res);
        let albums = res.albums.data as Album[];
        this.fillAlbum(albums, res.albums.data);
        this.albumService.saveAlbums(albums);
        this.albums = res.albums.data;
      })
      .catch((e: any) => console.error(e));
   
  }

  fillAlbum(albums: Album[], data: any){
    let count = 0;
    for (let entry of data) {
      if ( entry.photos ){
        albums[count].photos = entry.photos.data;
      }
      count += 1;
    }
    console.log(albums[0].photos);
  }



  title = 'app';
}
