import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
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

    createCategory(category: Category): Observable<Category>{
        return this.http.post<Category>(this.ORDER_API_URL + '/categories/new', category)
            .pipe(catchError(this.errorHandler));
    }

    deleteCategory(category: Category) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            body: category
        }

        this.http.delete(this.ORDER_API_URL + '/categories/delete', options).subscribe();
    }


    getAllCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.ORDER_API_URL + '/categories/all')
            .pipe(catchError(this.errorHandler));
    }

    errorHandler(error: HttpErrorResponse) {
        return throwError(error.error || 'Server error');
    }
}
