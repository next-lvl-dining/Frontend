import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
      this.statusChangeCallback(response);
    });
  }

  statusChangeCallback(response: any) {
    if (response.status === 'connected') {
      FB.api('/me?fields=name,email', (response) => {
        if (response && !response.error) {
          this.checkUser(response);
        }
      })
    } else {
      console.log('facebook login went wrong')
    }
  }

  checkUser(user) {
    this.userService.findUserByEmail(user.email)
      .subscribe(data => {
        this.login(user.email)
      },
        error => {
          console.log(error);
          if (error == 'User not found')
            this.registerUser(user);
        }
      );
  }

  registerUser(user) {
    this.userService.registerUser({ email: user.email, firstName: user.name }).subscribe(
      data => {
        this.login(user.email)
      },
      error => { console.log(error) },
    );
  }

  login(email: string) {
    this.authService.login(email).subscribe(
      data => {
        // user can be redirected to home page
        this.router.navigateByUrl('/home');
      },
      error => { console.log(error) })
  }

}
