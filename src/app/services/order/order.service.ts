import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LocalOrder} from '../../models/localorder';
import {catchError, tap} from 'rxjs/operators';
import {DeliveryOrder} from '../../models/deliveryorder';
import {Address} from '../../models/address';
import {OrderStatus} from '../../models/orderstatus';
import {log} from "util";
import {Category} from '../../models/category';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {



    constructor(private http: HttpClient, @Inject('ORDER_API_URL') private ORDER_API_URL: string) {
    }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.ORDER_API_URL + '/categories/all')
      .pipe(catchError(this.errorHandler));
  }
    
    getAllDeliveryOrderWithStatus(status : string): Observable<DeliveryOrder[]>{
      return this.http.get<DeliveryOrder[]>(this.ORDER_API_URL + '/deliveryorders/all/status/' + status)
              .pipe(catchError(this.errorHandler));
    }
    startDelivery(id : string): Observable<Response> {
      console.log(id);
      return this.http.get<Response>( this.ORDER_API_URL + '/deliveryorders/startdelivery/' + id)
              .pipe(catchError(this.errorHandler));
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

  createDeliveryOrder(userId: string,
                      totalPrice: number,
                      totalVat: number,
                      status: OrderStatus,
                      address: Address): Observable<DeliveryOrder> {
    return this.http.post<DeliveryOrder>(this.ORDER_API_URL + '/deliveryorders/new/', {
      userId,
      totalPrice,
      totalVat,
      status,
      address
    })
      .pipe(catchError(this.errorHandler));
  }

  createLocalOrder(userId: string,
                   totalPrice: number,
                   totalVat: number,
                   tableNumber: number,
                   status: OrderStatus): Observable<LocalOrder> {
    return this.http.post<LocalOrder>(this.ORDER_API_URL + '/localorders/new/', {
      userId,
      totalPrice,
      totalVat,
      status,
      tableNumber
    })
      .pipe(
        tap(x => log('placed local order')),
        catchError(this.errorHandler));
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.ORDER_API_URL + '/addresses/new/', address)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
