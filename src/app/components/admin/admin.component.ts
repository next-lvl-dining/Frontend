import {Component, OnInit, Renderer2} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  isAdmin = false;
  isLoggedIn = false;

  constructor(private authService: AuthService,
              private renderer: Renderer2,
              private router: Router) {
  }

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      alert('Login as admin to continue');
      this.router.navigateByUrl('/login');
    } else {

    }
  }

  manageAccounts() {
    this.router.navigateByUrl('/role');
  }

  manageProducts() {
    this.router.navigateByUrl('/product');
  }

  manageCategories() {
    this.router.navigateByUrl('/category');
  }

  manageCoupons() {
    this.router.navigateByUrl('coupon');
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
