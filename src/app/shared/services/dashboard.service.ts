import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceBase } from './base.service';
import { Observable } from 'rxjs';
import { apiName } from '@shared/Enum/api-name';
import { ChartResult, ChartResultFilter } from '@models/dashboard/chart-result';
import { TopProductResult } from '@models/dashboard/top-product';
import { PaymentMethodResult } from '@models/dashboard/payment-method';
import { LowStockResult } from '@models/dashboard/low-stock';
import { Result } from '@models/results/result';

export interface DashboardStats {
  totalUsers: number;
  totalProducts: number;
  totalQuantitySold: number;
  totalOrders: number;
  totalRevenue: number;
  sales: ChartResult[];
  users: ChartResult[];
  topProducts: TopProductResult[];
  paymentMethods: PaymentMethodResult[];
  lowStock: LowStockResult[];
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends ServiceBase<
  DashboardStats,
  DashboardStats,
  ChartResultFilter
> {
  constructor(http: HttpClient) {
    super(http, apiName.dashboard);
  }

  getStats(filter: ChartResultFilter): Observable<Result<DashboardStats>> {
    const params = this.buildHttpParams(filter);
    return this.http.get<Result<DashboardStats>>(
      this.baseUrl + '/stats',
      { params }
    );
  }
}
