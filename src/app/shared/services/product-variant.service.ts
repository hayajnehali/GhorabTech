import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from './base.service';
import {
  ProductVariantDto,
  ProductVariantFilter,
  ProductVariantResult,
} from '@models/product-variant';
import { apiName } from '@shared/Enum/api-name';
import { Observable } from 'rxjs';
import { Result } from '@models/results/result';

@Injectable({
  providedIn: 'root',
})
export class ProductVariantService extends ServiceBase<
  ProductVariantDto,
  ProductVariantResult,
  ProductVariantFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.productVariant);
  }

  checkAvailability(
    id: string,
    quantity: number
  ): Observable<Result<boolean>> {
    return this.http.get<Result<boolean>>(
      `${this.baseUrl}/check-availability/${id}/${quantity}`
    );
  }
}
