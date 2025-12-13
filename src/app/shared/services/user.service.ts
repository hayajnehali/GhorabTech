import { Injectable } from '@angular/core';
import { ServiceBase } from './base.service';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
import { User, UserFilter, UserResult } from '@models/user';
import { Observable } from 'rxjs';
import {
  OperationResult,
  OperationResultGeneric,
} from '@core/base/operation-result';
import { Auth } from '@models/auth';

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
  ): Observable<OperationResultGeneric<number>> {
    const params = this.buildHttpParams(filter);
    return this.http.get<OperationResultGeneric<number>>(
      this.baseUrl + '/get-total-users',
      { params }
    );
  }
  checkCode(item: Auth): Observable<OperationResultGeneric<Auth>> {
    return this.http.post<OperationResultGeneric<Auth>>(
      this.baseUrl + '/confirm-email',
      item
    );
  }
}
