import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, @Inject('API_URL') private API_URL: string) { }

  registerUser(user: any): Observable<object> {
    return this.http.post(this.API_URL + '/user', user)
      .pipe(catchError(this.errorHandler));
  }

  findUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.API_URL + '/user/email/' + email)
      .pipe(catchError(this.errorHandler));
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL + '/user/all')
      .pipe(catchError(this.errorHandler));
  }

  addRole(uuid: string, role: string): Observable<object> {
    return this.http.put(this.API_URL + `/user/${uuid}/role/add/${role}`, {})
      .pipe(catchError(this.errorHandler));
  }

  removeRole(uuid: string, role: string): Observable<object> {
    return this.http.put(this.API_URL + `/user/${uuid}/role/remove/${role}`, {})
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
