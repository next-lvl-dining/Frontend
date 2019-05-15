import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoggedInService } from 'src/app/services/loggedIn/logged-in.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;

  constructor(private authService: AuthService, private loggedInService: LoggedInService, private renderer: Renderer2) { }

  ngOnInit() {
    this.loggedInService.isUserLoggedIn.subscribe(value => {
      this.updateHeader();
    });
    this.updateHeader();
  }

  updateHeader() {
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
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
    this.authService.logout();
    this.isLoggedIn = false;
    this.isAdmin = false;
  }

}
