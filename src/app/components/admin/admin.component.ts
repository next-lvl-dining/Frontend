import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  manageAccounts() {
    this.router.navigateByUrl('/account');
  }

  manageProducts() {
    this.router.navigateByUrl('/product');
  }

  manageCategories() {
    this.router.navigateByUrl('/category');
  }

}
