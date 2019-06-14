import { Component, OnInit } from '@angular/core';
import {ServerComponent} from "../../models/component.enum";
import {Level} from "../../models/level.enum";
import {LoggingService} from "../../services/logging/logging.service";
import {Log} from "../../models/log";

@Component({
  selector: 'app-logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.scss']
})
export class LoggingComponent implements OnInit {

  levels = Level;
  components = ServerComponent;

  private allLogs: Log[];
  private logList: Log[];

  private component: ServerComponent;
  private level: Level;

  private testMessage: string;
  private testLevel: Level;

  constructor(private loggingService: LoggingService) { }

  ngOnInit() {
    this.fetchLogs();
  }

  sendTestLog() {
    this.component = undefined;
    this.level = undefined;
    this.loggingService.addTestLog(this.testMessage, this.testLevel).subscribe(x => this.fetchLogs())
  }

  addLogToList(log: Log){
  }

  fetchLogs() {
    //todo
    if(this.level != undefined && this.component != undefined){
      this.loggingService.getLogsForComponentWithLevel(this.level, this.component).subscribe(x => this.logList = x)
    } else if (this.level != undefined){
      this.loggingService.getLogsWithLevel(this.level).subscribe(x => this.logList = x)
    } else if (this.component != undefined){
      this.loggingService.getLogsWithComponent(this.component).subscribe(x => this.logList = x)
    } else {
      this.loggingService.getAllLogs().subscribe(x => this.logList = x)
    }
  }

  componentKeys(): string[] {
    return Object.keys(this.components);
  }

  levelKeys(): string[] {
    return Object.keys(this.levels)
  }
}
