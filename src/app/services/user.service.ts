import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<Object> {
    return this.http.post(Config.API_URL + '/user', user)
      .pipe(catchError(this.errorHandler));
  }

  findUserByEmail(email: String): Observable<Object> {
    return this.http.get(Config.API_URL + '/user/email/' + email)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
