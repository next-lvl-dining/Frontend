import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  users: User[];
  availableRoles: Role[];
  checked: string;

  constructor(private userService: UserService, private roleService: RoleService) { }

  ngOnInit() {
    this.getUsers();
    this.getRoles();
  }

  getUsers() {
    this.userService.getAll().subscribe(
      data => this.users = data,
      error => console.log(error))
  }

  getRoles() {
    this.roleService.getAll().subscribe(
      data => this.availableRoles = data,
      error => console.log(error))
  }

  addRole(role: string) {
    console.log(this.checked);
    console.log(role);
    this.userService.addRole(this.checked, role).subscribe(
      data => { this.getUsers() },
      error => { alert('User already has role') })
  }

}
