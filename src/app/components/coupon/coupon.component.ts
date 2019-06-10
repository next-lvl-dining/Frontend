import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { Coupon } from 'src/app/models/coupon';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.scss']
})
export class CouponComponent implements OnInit {
  messageForm: FormGroup;
  today = new Date().toJSON().split('T')[0];
  coupons: Coupon[];
  user: User = null;
  users: User[];
  filteredUsers: User[];

  constructor(
    private userService: UserService, private roleService: RoleService, private formBuilder: FormBuilder,
    private couponService: CouponService, private authService: AuthService, private router: Router) {
    this.messageForm = this.formBuilder.group({
      couponCode: ['', Validators.required],
      date: [, Validators.required],
      rate: [1, Validators.required],
      maxUses: [1, Validators.required],
      type: ['0', Validators.required],
      search: ['']
    });
  }

  ngOnInit() {
    if (!this.authService.hasRole('admin')) {
      alert('Login as admin to continue');
      this.router.navigateByUrl('/login');
    } else {
      this.getUsers();
      this.getCoupons();
    }
  }

  getUsers() {
    this.userService.getAll().subscribe(
      data => this.users = data,
      error => console.log(error));
  }

  setUser(user: User) {
    this.user = user;
    this.messageForm.patchValue({
      search: user.email
    });
    this.filteredUsers = [];
  }

  filter() {
    this.filteredUsers = this.users.filter(user => user.email.indexOf(this.messageForm.value.search) !== -1).slice(0, 3);
  }

  getCoupons() {
    this.couponService.getAll().subscribe(
      data =>
        this.coupons = data,
      error => console.log(error));
  }

  createCoupon() {
    if (this.messageForm.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    const coupon: Coupon = {
      userId: this.user ? this.user.id : null,
      rate: this.messageForm.value.rate,
      code: this.messageForm.value.couponCode,
      expDate: this.messageForm.value.date,
      maxUses: this.messageForm.value.maxUses,
      type: this.messageForm.value.type
    };

    this.couponService.createCoupon(coupon).subscribe(
      data => {
        this.getCoupons();
        alert('Coupon made');
        this.user = null;
      },
      error => {
        if (error.status === 400) {
          alert('Code already exists');
        }
        console.log(error);
      });
  }
}
