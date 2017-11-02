import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';
import {MatInputModule} from '@angular/material';

import { AuthenticationService } from '../../service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.html'
})
export class LoginComponent {

  error = '';

  constructor(public router: Router, public http: Http, private auth: AuthenticationService) {
  }

  login(event, username, password) {
    event.preventDefault();
    this.auth.login(username, password)
        .subscribe(result => {
            if (result === true) {
                console.log("success ss");
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

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
