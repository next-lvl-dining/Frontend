import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpResponse} from "@angular/common/http";
import {log} from "util";

declare const FB: any;
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {

  public auth2: any;
  messageForm: FormGroup;
  submitted = false;

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.facebookInit();
  }

  ngAfterViewInit() {
    // this.googleInit();
  }

  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
      alert('Fill in the required fields please');
      return;
    }

    this.authService.login({ email: this.messageForm.controls.email.value, password: this.messageForm.controls.password.value })
      .subscribe((data) => {
        this.nav(data.headers.get('Authorization').slice(7)); // Slice "Bearer "
      },
        error => {
          if (error.status === 400) {
            alert('Wrong username/password combination');
          } else {
            alert('Login went wrong');
          }
        });
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

    (window as any).fbAsyncInit = () => {
      FB.init({
        appId: '614405052374313',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
      });
      FB.AppEvents.logPageView();

      FB.getLoginStatus(response => {
        this.login(response.authResponse.accessToken, 'Facebook');
      });

    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    FB.XFBML.parse();
  }

  login(token: string, provider: string) {
    this.authService.socialLogin(token, provider).subscribe(
      data => {
        this.nav(data.headers.get('Authorization').slice(7));
      },
      error => { console.log(error); });
  }

  nav(auth: string) {
    this.authService.setSession(auth);
    let role = localStorage.getItem('role');
    log(role);
    if(role === 'table'){
      this.router.navigate(['/home-table'])
    } else{
      this.router.navigateByUrl('/reservation');
    }
  }

}
