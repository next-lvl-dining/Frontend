import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient, @Inject('PAYMENT_API_URL') private API_URL: string) {
  }

  creditCheckout(token: string, amount: string ): Observable<object> {
    return this.http.post(this.API_URL + '/payment/card', {token, amount})
      .pipe(catchError(this.errorHandler));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
