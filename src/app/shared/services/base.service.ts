import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { InjectionToken } from '@angular/core'; 
import { environment } from '../environment/environment';
import { PagedResult } from '@models/results/search-filter';
import { Result } from '@models/results/result';
export const BASE_URL = new InjectionToken<string>('BaseUrl');

@Injectable({
  providedIn: 'root',
})
export class ServiceBase<TData, TResult, F extends object> {
  protected baseUrl: string = environment.apiUrl;

  constructor(protected http: HttpClient, @Inject(BASE_URL) baseUrll: string) {
    this.baseUrl = this.baseUrl + baseUrll;
  }
  getAll(filterCriteria: F): Observable<PagedResult<TResult>> {
    const params = this.buildHttpParams(filterCriteria);

    return this.http
      .get<PagedResult<TResult>>(this.baseUrl + '/getAll', {
        params,
      })
      .pipe(
        catchError((err) => {
          console.error('Error occurred:', err);
          return throwError(err);
        })
      );
  }
  protected buildHttpParams(filterCriteria: any): HttpParams {
    let params = new HttpParams();

    Object.keys(filterCriteria).forEach((key) => {
      const value = filterCriteria[key];
      if (value !== undefined && value !== null) {
        params = params.append(key, String(value));
      }
    });

    return params;
  }

  getById(id: string): Observable<Result<TResult>> {
    return this.http
      .get<Result<TResult>>(`${this.baseUrl}/getById/${id}`)
      .pipe(
        catchError(
          this.handleError<Result<TResult>>(`getById id=${id}`)
        )
      );
  }

  create(item: TData): Observable<Result<TData>> {
    return this.http.post<Result<TData>>(this.baseUrl + '/create', item);
  }

  update(item: TData): Observable<Result<TData>> {
    return this.http.put<Result<TData>>(`${this.baseUrl}/update`, item);
  }

  delete(id: string) {
    return this.http
      .delete(`${this.baseUrl}/delete/${id}`)
      .pipe(catchError(this.handleError<any>('delete')));
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      //console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
