import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ServiceBase } from './base.service';
import { Product, ProductFilter, ProductResult } from '../../model/product';
import { apiName } from '../Enum/api-name';
import { Observable } from 'rxjs';
import { Comment } from '@models/comment';
import { PagedResult } from '@models/results/search-filter';
import { Result } from '@models/results/result';
@Injectable({
  providedIn: 'root',
})
export class ProductService extends ServiceBase<
  Product,
  ProductResult,
  ProductFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.product);
  }

  getTotalProduct(
    filter: ProductFilter
  ): Observable<Result<number>> {
    const params = this.buildHttpParams(filter);
    return this.http.get<Result<number>>(
      this.baseUrl + '/get-total-product',
      { params }
    );
  }
  addOrUpdateRating(
    productId: string,
    stars: number
  ): Observable<Result<number>> {
    return this.http.put<Result<number>>(
      `${this.baseUrl}/add-or-update-rating/${productId}/${stars}`,
      {}
    );
  }
  addComment(newEntry: Comment) {
    return this.http.post<Comment>(this.baseUrl + '/create-comment', newEntry);
  }
  updateComment(comment: Comment) {
    return this.http.put<Comment>(this.baseUrl + '/update-comment', comment);
  }
}
