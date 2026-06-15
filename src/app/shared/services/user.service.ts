import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { User, UserFilter, UserResult } from '@models/user';
import { Observable } from 'rxjs';
import { Auth } from '@models/auth';
import { PagedResult } from '@models/results/search-filter';
import { Result } from '@models/results/result';

@Injectable({
  providedIn: 'root',
})
export class UserService extends ServiceBase<User, UserResult, UserFilter> {
  constructor(http: HttpClient) {
    super(http, apiName.user);
  }
  // override create(item: User): Observable<OperationResult> {
  //   return this.http.post<OperationResult>(this.baseUrl + '/create', item);
  // }

  // login(data: Auth): Observable<OperationResultGeneric<Auth>> {
  //   return this.http.post<OperationResultGeneric<Auth>>(`${this.baseUrl}/signIn`, data);
  // }

  getTotalUsers(
    filter: UserFilter
  ): Observable<Result<number>> {
    const params = this.buildHttpParams(filter);
    return this.http.get<Result<number>>(
      this.baseUrl + '/get-total-users',
      { params }
    );
  }
  checkCode(item: Auth): Observable<Result<Auth>> {
    return this.http.post<Result<Auth>>(
      this.baseUrl + '/confirm-email',
      item
    );
  }
}
