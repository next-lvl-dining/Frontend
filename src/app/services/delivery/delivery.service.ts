import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { Delivery } from 'src/app/models/delivery';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http: HttpClient, @Inject('DELIVER_API_URL') private DELIVER_API_URL: string) { }

  createDelivery(delivery : Delivery): Observable<Response> {
    return this.http.post<Response>('http://localhost:8080/deliver/api' + '/deliveries/create/', delivery,httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  startSimulation(delivery : Delivery): Observable<Response> {
    return this.http.post<Response>('http://localhost:8080/deliver/api' + '/deliveries/simulation',delivery,httpOptions)
    .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
}
}
