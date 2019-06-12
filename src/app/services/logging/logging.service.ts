import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Log} from "../../models/log";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {log} from "util";
import {Level} from "../../models/level.enum";
import {ServerComponent} from "../../models/component.enum";

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient, @Inject('LOGGING_API_URL') private LOGGING_API_URL: string) {
  }

  getAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {}).pipe(
      tap(x => log(x)),
      catchError(this.errorHandler)
    );
  }

  getLogsWithComponent(comp: ServerComponent): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {component: comp}}).pipe(
      tap(x => log(x)),
      catchError(this.errorHandler)
    );
  }

  getLogsWithLevel(lvl: Level): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {level: lvl}}).pipe(
      tap(x => log(x)),
      catchError(this.errorHandler)
    );
  }

  getLogsForComponentWithLevel(lvl: Level, comp: ServerComponent): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {component: comp, level: lvl}}).pipe(
      tap(x => log(x)),
      catchError(this.errorHandler)
    );
  }

  addTestLog(msg: string, lvl: Level): Observable<Log> {
    return this.http.post<Log>(`${this.LOGGING_API_URL}/logs`, {
      params: {
        message: msg,
        level: lvl
      }}).pipe(
        tap(x => log(x)),
        catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
