import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { BASE_URL, ServiceBase } from '@shared/services/base.service';
import { Observable, throwError } from 'rxjs';
import {
  ProductCollectionFilter,
  ProductCollectionItemRequest,
  ProductCollectionRequest,
  ProductCollectionResponse,
} from '../models/product-collection.model';
import { Result } from '@models/results/result';
import { apiName } from '@shared/Enum/api-name';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService extends ServiceBase<
  ProductCollectionRequest,
  ProductCollectionResponse,
  ProductCollectionFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.ProductCollection);
  }
  // create(item: ProductCollectionRequest): Observable<Result<ProductCollectionResponse>> {
  //   return this.http.post<Result<ProductCollectionResponse>>(this.baseUrl + '/create', item);
  // }

  // getById(id: string): Observable<Result<ProductCollectionResponse>> {
  //   return this.http.get<Result<ProductCollectionResponse>>(this.baseUrl + '/get-by-id/' + id);
  // }
}
