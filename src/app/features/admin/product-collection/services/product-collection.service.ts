import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { BASE_URL } from '@shared/services/base.service';
import { Observable, throwError } from 'rxjs';
import { ProductCollectionRequest, ProductCollectionResponse } from '../models/product-collection.model';
import { Result } from '@models/results/result';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService {
  protected baseUrl: string = environment.apiUrl + 'ProductCollection';

  private readonly http = inject(HttpClient);
  constructor() { }

  create(item: ProductCollectionRequest): Observable<Result<ProductCollectionResponse>> {
    return this.http.post<Result<ProductCollectionResponse>>(this.baseUrl + '/create', item);
  }

  update(item: ProductCollectionRequest): Observable<Result<ProductCollectionResponse>> {
    return this.http.put<Result<ProductCollectionResponse>>(this.baseUrl + '/update', item);
  }

  getById(id: string): Observable<Result<ProductCollectionResponse>> {
    return this.http.get<Result<ProductCollectionResponse>>(this.baseUrl + '/get-by-id/' + id);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/delete/' + id);
  }

  activate(id: string): Observable<Result<ProductCollectionResponse>> {
    return this.http.put<Result<ProductCollectionResponse>>(this.baseUrl + '/activate/' + id, {});
  }

  deactivate(id: string): Observable<Result<ProductCollectionResponse>> {
    return this.http.put<Result<ProductCollectionResponse>>(this.baseUrl + '/deactivate/' + id, {});
  }
}
