import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LocalOrder} from '../../models/localorder';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, @Inject('ORDER_API_URL') private ORDER_API_URL: string) { }

  getAllLocalOrderFromUser(userId: string): Observable<LocalOrder[]> {
    return this.http.get<LocalOrder[]>(this.ORDER_API_URL + '/all' + '/' + userId)
        .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
