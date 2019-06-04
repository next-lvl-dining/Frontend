import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

declare const FB: any;
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public auth2: any;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.googleInit();
    this.facebookInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '1045242184114-6sfb2bthjqkq800a8ojicipek83pu21m.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('googleButton'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        this.login(googleUser.getAuthResponse().id_token, 'Google');
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  facebookInit() {
    FB.init({
      appId: '614405052374313',
      xfbml: true,
      version: 'v3.2'
    });

    FB.getLoginStatus(response => {
      this.login(response.authResponse.accessToken, 'Facebook');
    });
  }

  login(token: string, provider: string) {
    this.authService.login(token, provider).subscribe(
      data => {
        // this.router.navigateByUrl('/role');
      },
      error => { console.log(error); });
  }

}
