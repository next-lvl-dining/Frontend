import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { Coupon } from 'src/app/models/coupon';

@Component({
  selector: 'app-admin',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  users: User[];
  availableRoles: Role[];
  checked: string;

  constructor(
    private userService: UserService, private roleService: RoleService) {
  }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      data => this.users = data,
      error => console.log(error));
  }

  getRoles() {
    this.roleService.getAll().subscribe(
      data => this.availableRoles = data,
      error => console.log(error));
  }

  addRole(role: string) {
    if (this.checked) {
      this.userService.addRole(this.checked, role).subscribe(
        data => this.getUsers(),
        error => alert('User already has role'));
    } else {
      alert('Please select a user');
    }
  }

  removeRole(role: string) {
    if (this.checked) {
      this.userService.removeRole(this.checked, role).subscribe(
        data => this.getUsers(),
        error => alert('Can\'t remove role'));
    } else {
      alert('Please select a user');
    }
  }

}
