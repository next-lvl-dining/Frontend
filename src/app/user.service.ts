import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL = 'http://localhost:8080/login/api'

  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<Object> {
    return this.http.post(this.API_URL + '/user', user)
      .pipe(catchError(this.errorHandler));
  }

  findUserByEmail(email: String): Observable<Object> {
    return this.http.get(this.API_URL + '/user/email/' + email)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }
}
