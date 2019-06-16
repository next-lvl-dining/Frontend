import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Log} from '../../models/log';
import {Observable, of, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {log} from 'util';
import {Level} from '../../models/level.enum';
import {ServerComponent} from '../../models/component.enum';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(private http: HttpClient, @Inject('LOGGING_API_URL') private LOGGING_API_URL: string) {
  }

  getAllLogs(): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {}).pipe(
      tap(x => log(x)),
      catchError(this.handleError<Log[]>('get all logs'))
    );
  }

  getLogsWithComponent(comp: ServerComponent): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {component: comp}}).pipe(
      tap(x => log(x)),
      catchError(this.handleError<Log[]>('get logs with component'))
    );
  }

  getLogsWithLevel(lvl: Level): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {level: lvl}}).pipe(
      tap(x => log(x)),
      catchError(this.handleError<Log[]>('get logs with level'))
    );
  }

  getLogsForComponentWithLevel(lvl: Level, comp: ServerComponent): Observable<Log[]> {
    return this.http.get<Log[]>(`${this.LOGGING_API_URL}/logs`, {params: {component: comp, level: lvl}}).pipe(
      tap(x => log(x)),
      catchError(this.handleError<Log[]>('get logs for component with level'))
    );
  }

  addTestLog(msg: string, lvl: Level): Observable<Log> {
    return this.http.post<Log>(`${this.LOGGING_API_URL}/logs`, null, {
      params: {
        message: msg,
        level: lvl
      }}).pipe(
        tap(x => log(x)),
        catchError(this.handleError<Log>('send test log'))
    );
  }

  private log(message: string) {
    log.add(`loggingService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
