import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthenticationService {
    private authUrl = 'http://localhost:8080/auth';
    private signUpUrl = 'http://localhost:8080/sign-up';
    private updateFacebookTokenUrl = 'http://localhost:8080/update_facebook_token';
    private meUrl = 'http://localhost:8080/me';

    private headers = new Headers({'Content-Type': 'application/json'});


    private secure_headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    private secure_options = new RequestOptions({
        headers: this.secure_headers
    })

    constructor(private http: Http, private router:Router) {
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.authUrl, 
            JSON.stringify({username: username, password: password}), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    return true;
                } else {
                    return false;
                }
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    signUp(username: string, email: string, password: string) {
        return this.http.post(this.signUpUrl, 
            JSON.stringify({
                username: username, email: email, password: password
            }), {headers: this.headers})
            .map((response: Response) => {
                  this.router.navigate(['login']);
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    updateFacebookToken(facebookToken: string){
       return this.http.post(this.updateFacebookTokenUrl, 
            JSON.stringify({
                facebookToken: facebookToken
            }), this.secure_options)
            .map((response: Response) => {
                    return true;
            }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    me(){
     return this.http.get(this.meUrl, this.secure_options)
           .map((response) => {
              let data = response.json();
              console.log(data);
              localStorage.setItem('myDetails', JSON.stringify(data));
              return response.json();
            })
            .toPromise();
    }

    getToken(): String {
      var currentUser = JSON.parse(localStorage.getItem('currentUser'));
      var token = currentUser && currentUser.token;
      console.log("----------"+token);
      return token ? token : "";
    }

    getFacebookToken(): String {
      var currentUser = JSON.parse(localStorage.getItem("currentUser"));
      var facebookToken = currentUser && currentUser.facebookToken;
      return facebookToken ? facebookToken : "";
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('albums');
        localStorage.removeItem('myDetails');
    }

    isLoggedIn(): boolean {
      var token: String = this.getToken();
      return token && token.length > 0;
    }
}