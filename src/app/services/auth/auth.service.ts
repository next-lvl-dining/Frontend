import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoggedInService } from '../loggedIn/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, @Inject('LOGIN_API_URL') private API_URL: string, private loggedInService: LoggedInService) { }

  login(token: string) {
    return this.http.post<object>(this.API_URL + '/auth', { token }, { observe: 'response' })
      .pipe(tap((res) => {
        this.setSession(res.headers.get('Authorization').slice(7)); // Slice "Bearer "
      }));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }

  private setSession(token) {
    localStorage.setItem('token', token);
    this.loggedInService.isUserLoggedIn.next(true);
  }

  isAdmin(): boolean {
    if (!this.isLoggedIn()) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    if (decodedToken.roles.indexOf('admin') !== -1) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
  }

  public isLoggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
