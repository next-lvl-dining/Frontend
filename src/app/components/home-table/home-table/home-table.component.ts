import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-table',
  templateUrl: './home-table.component.html',
  styleUrls: ['./home-table.component.scss']
})
export class HomeTableComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

  }

  navToOrder() {
    this.router.navigate(['table/table-order'])
  }

}
