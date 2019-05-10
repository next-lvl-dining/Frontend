import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../models/user';
import { Reservation } from 'src/app/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  constructor(private http: HttpClient, @Inject('API_URL') private API_URL: string) { }

  createReservation(reservation: Reservation): Observable<object> {
    return this.http.post(this.API_URL + '/reservation/new', reservation)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
