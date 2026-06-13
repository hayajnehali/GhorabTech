import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { environment } from '@shared/environment/environment';
import { BASE_URL } from '@shared/services/base.service';
import { Observable, throwError } from 'rxjs';
import { ProductCollectionRequest } from '../models/product-collection.model';
import { Result } from '@models/results/result';

@Injectable({
  providedIn: 'root',
})
export class ProductCollectionService {
  protected baseUrl: string = environment.apiUrl + 'ProductCollection';

  private readonly http = inject(HttpClient);
  constructor() { }

  create(item: ProductCollectionRequest): Observable<Result<any>> {
    return this.http.post<Result<any>>(this.baseUrl + '/create', item);
  }
}
