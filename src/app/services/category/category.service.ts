import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Category} from '../../models/category';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(
        private http: HttpClient,
        @Inject('ORDER_API_URL')
        private ORDER_API_URL: string
    ) {
    }

    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.ORDER_API_URL + '/categories/all')
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.error || 'Server error');
    }
}
