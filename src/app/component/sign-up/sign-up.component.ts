import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../service/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.html',
  styleUrls: [`./sign-up.css`]
})

export class SignUpComponent {

  constructor(public router: Router, public http: Http, private auth: AuthenticationService) {
  }

  error = '';

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('')
  });

  signUp() {

    let username = this.signUpForm.get('username').value.trim();
    let email = this.signUpForm.get('email').value.trim();
    let password = this.signUpForm.get('password').value.trim();

    event.preventDefault();
    this.auth.signUp(username, email, password)
      .subscribe(result => {
          if (result === true) {
              // login successful
              console.log("success");

              this.router.navigate(['login']);
          } else {
              // login failed
              console.log("error");
              this.error = 'Username or password is incorrect';
          }
        }, error => { this.error = error; 
      });
    }

  login(event) {
    event.preventDefault();
    this.router.navigate(['login']);
  }
}
