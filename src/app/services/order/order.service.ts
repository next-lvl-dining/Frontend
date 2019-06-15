import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LocalOrder} from '../../models/localorder';
import {catchError} from 'rxjs/operators';
import {DeliveryOrder} from '../../models/deliveryorder';
import {Address} from '../../models/address';
import {OrderStatus} from '../../models/orderstatus';

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private http: HttpClient, @Inject('ORDER_API_URL') private ORDER_API_URL: string) {
    }
    getAllLocalOrderFromUser(userId: string): Observable<LocalOrder[]> {
        console.log(this.ORDER_API_URL);
        console.log(userId);
        return this.http.get<LocalOrder[]>(this.ORDER_API_URL + '/localorders/all/' + userId)
            .pipe(catchError(this.errorHandler));
    }
    getAllDeliveryOrderFromUser(userId: string): Observable<DeliveryOrder[]> {
        return this.http.get<DeliveryOrder[]>(this.ORDER_API_URL + '/deliveryorders/all/' + userId)
            .pipe(catchError(this.errorHandler));
    }
    createDeliveryOrder(userId: string, totalPrice: number, totalVat: number, status: OrderStatus): Observable<Response> {
      return this.http.post<Response>(this.ORDER_API_URL + '/deliveryorders/new/', {userId, totalPrice, totalVat, status})
        .pipe(catchError(this.errorHandler));
    }

  createAddress(address: Address): Observable<Response> {
    return this.http.post<Response>(this.ORDER_API_URL + '/addresses/new/', address)
      .pipe(catchError(this.errorHandler));
  }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.error || 'Server error');
    }
}
