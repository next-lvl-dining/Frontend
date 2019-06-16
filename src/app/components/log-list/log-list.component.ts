import {Component, Input, OnInit} from '@angular/core';
import {Log} from '../../models/log';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {

  logs: Log[];

  @Input()
  set logList(x: Log[]) {
    this.logs = x;
  }

  constructor() { }

  ngOnInit() {
  }

}
