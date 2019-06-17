import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoggedInService } from 'src/app/services/loggedIn/logged-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role: string;
  isLoggedIn = false;

  constructor(private authService: AuthService, private loggedInService: LoggedInService, private renderer: Renderer2, private router: Router) { }

  ngOnInit() {
    this.loggedInService.isUserLoggedIn.subscribe(value => {
      this.updateHeader();
    });
    this.updateHeader();
  }

  updateHeader() {
    this.role = localStorage.getItem('role');
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
  }

  nav(element: string) {
    if (document.getElementsByClassName('selected')[0]) {
      this.renderer.removeClass(document.getElementsByClassName('selected')[0], 'selected');
    }
    if (element) {
      this.renderer.addClass(document.getElementsByClassName(element)[0], 'selected');
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.role = '';
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
