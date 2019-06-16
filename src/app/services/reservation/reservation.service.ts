import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Reservation, ReservationDTO } from 'src/app/models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  getByDate(date: string): Observable<ReservationDTO[]> {
    return this.http.get<ReservationDTO[]>(this.API_URL + '/reservation/' + date)
      .pipe(catchError(this.errorHandler));
  }
  constructor(private http: HttpClient, @Inject('RESERVE_API_URL') private API_URL: string) { }

  createReservation(reservation: Reservation): Observable<object> {
    return this.http.post(this.API_URL + '/reservation/new', reservation)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.error || 'Server error');
  }
}
