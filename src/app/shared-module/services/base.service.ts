import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; 
import { InjectionToken } from '@angular/core';
import { PaginatedResult } from '../../model/paginated.result';
@Injectable({
  providedIn: 'root',
})
export class GenericService<T,F extends object> {
  protected baseUrl:string="https://localhost:44360/api/"
  constructor(protected http: HttpClient,@Inject(BASE_URL) baseUrll:string) {

this.baseUrl=this.baseUrl+baseUrll;
  }

 

  getAll(filterCriteria: F): Observable<PaginatedResult<T[]>> {
    let params = new HttpParams();
    
    // Assuming filterCriteria is an object with key-value pairs
    Object.keys(filterCriteria).forEach(key => {
      const value = filterCriteria[key as keyof F];
      
      if (value !== undefined && value !== null) {
        params = params.append(key, String(value));  
      }
    });

    return this.http.get<PaginatedResult<T[]>>(this.baseUrl+"/getAll", { params })  .pipe(
      catchError(err => {
        console.error('Error occurred:', err);
        return throwError(err);
      })
    );
  }



  getById(id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/getById/${id}`).pipe(
      catchError(this.handleError<T>(`getById id=${id}`))
    );
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.baseUrl+"/create", item)
  }
  // create(item: T): Observable<T> {
  //   return this.http.post<T>(this.baseUrl+"/create", item).pipe(
  //     catchError(this.handleError<T>('create'))
  //   );
  // }

  update(item: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/update`, item)
  }
  // update(item: T): Observable<T> {
  //   return this.http.put<T>(`${this.baseUrl}/update`, item).pipe(
  //     catchError(this.handleError<T>('update'))
  //     this.notificationService.showError(error);
  //   );
  // }

  delete(id: number): Observable<PaginatedResult<T>> {
    return this.http.delete<PaginatedResult<T>>(`${this.baseUrl}/delete/${id}`).pipe(
      catchError(this.handleError<PaginatedResult<T>>('delete'))
    );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}


export const BASE_URL = new InjectionToken<string>('BaseUrl');