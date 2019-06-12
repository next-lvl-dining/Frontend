import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Coupon } from 'src/app/models/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient, @Inject('PROMOTION_API_URL') private API_URL: string) { }

  createCoupon(coupon: any): Observable<object> {
    return this.http.post(this.API_URL + '/coupon/new', coupon)
      .pipe(catchError(this.errorHandler));
  }

  getAll() {
    return this.http.get<Coupon[]>(this.API_URL + '/coupon/getall')
      .pipe(catchError(this.errorHandler));
  }
  getCoupon(couponCode: string) {
    return this.http.get<Coupon>(this.API_URL + '/coupon/' + couponCode)
      .pipe(catchError(this.errorHandler));
  }

  useCoupon(couponCode: string) {
    return this.http.put<Coupon>(this.API_URL + '/coupon/' + couponCode, {})
      .pipe(catchError(this.errorHandler));
  }



  errorHandler(error: HttpErrorResponse) {
    return throwError(error || 'Server error');
  }
}
