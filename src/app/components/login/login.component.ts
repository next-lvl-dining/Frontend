import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

declare const FB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    FB.init({
      appId: '614405052374313',
      xfbml: true,
      version: 'v3.2'
    });

    FB.getLoginStatus(response => {
      this.login(response.authResponse.accessToken);
    });
  }

  login(token: string) {
    this.authService.login(token).subscribe(
      data => {
        // user can be redirected to some page
        this.router.navigateByUrl('/admin');
      },
      error => { console.log(error); });
  }

}
