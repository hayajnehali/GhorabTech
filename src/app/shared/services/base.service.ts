import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InjectionToken } from '@angular/core';
import { PaginatedResult } from '../../model/paginated.result';
import { environment } from '../environment/environment';
export const BASE_URL = new InjectionToken<string>('BaseUrl');

@Injectable({
  providedIn: 'root',
})
export class ServiceBase<TData,TResult, F extends object> {
  protected baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient, @Inject(BASE_URL) baseUrll: string) {
    this.baseUrl = this.baseUrl + baseUrll;
  }

  getAll(filterCriteria: F): Observable<PaginatedResult<TResult[]>> {
    let params = new HttpParams(); 
    Object.keys(filterCriteria).forEach((key) => {
      const value = filterCriteria[key as keyof F];

      if (value !== undefined && value !== null) {
        params = params.append(key, String(value));
      }
    });

    return this.http
      .get<PaginatedResult<TResult[]>>(this.baseUrl + '/getAll', { params })
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return throwError(err);
        })
      );
  }

  getById(id: number): Observable<TResult> {
    return this.http
      .get<TResult>(`${this.baseUrl}/getById/${id}`)
      .pipe(catchError(this.handleError<TResult>(`getById id=${id}`)));
  }

  create(item: TData): Observable<TData> {
    return this.http.post<TData>(this.baseUrl + '/create', item);
  }
  // create(item: T): Observable<T> {
  //   return this.http.post<T>(this.baseUrl+"/create", item).pipe(
  //     catchError(this.handleError<T>('create'))
  //   );
  // }

  update(item: TData): Observable<TData> {
    return this.http.put<TData>(`${this.baseUrl}/update`, item);
  }
  // update(item: T): Observable<T> {
  //   return this.http.put<T>(`${this.baseUrl}/update`, item).pipe(
  //     catchError(this.handleError<T>('update'))
  //     this.notificationService.showError(error);
  //   );
  // }

  delete(id: number) {
    return this.http
      .delete(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

