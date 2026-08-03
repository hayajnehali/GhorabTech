import { Component, inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChartResult, ChartResultFilter } from '@models/dashboard/chart-result';
import { TopProductResult } from '@models/dashboard/top-product';
import { PaymentMethodResult } from '@models/dashboard/payment-method';
import { LowStockResult } from '@models/dashboard/low-stock';
import { GroupByChartResult } from '@shared/Enum/group-by-chart-result';
import { DashboardService } from '@shared/services/dashboard.service';

export type DashboardDateFilter = 'today' | 'last7' | 'last30' | 'month' | 'year';

export interface DashboardCardItem {
  icon: string;
  label: string;
  value: number;
  color: 'primary' | 'success' | 'info';
  currency?: boolean;
  tooltip: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  dashboardService = inject(DashboardService);
  translate = inject(TranslateService);

  cards: DashboardCardItem[] = [];
  data: ChartResult[] = [];
  usersData: ChartResult[] = [];
  topProducts: TopProductResult[] = [];
  paymentMethods: PaymentMethodResult[] = [];
  lowStock: LowStockResult[] = [];
  filter = new ChartResultFilter();
  groupByChartResult: typeof GroupByChartResult = GroupByChartResult;
  totalRevenue: number = 0;
  totalQuantitySold: number = 0;
  totalOrders: number = 0;
  selectedFilter: DashboardDateFilter = 'year';
  expandedCardIndex: number | null = null;

  constructor() {
    this.filter.groupBy = GroupByChartResult.years;
  }
  ngOnInit(): void {
    this.getStats();
  }
  getStats() {
    this.dashboardService.getStats(this.filter).subscribe((res) => {
      const stats = res.data;
      this.data = stats?.sales ?? [];
      this.usersData = stats?.users ?? [];
      this.topProducts = stats?.topProducts ?? [];
      this.paymentMethods = stats?.paymentMethods ?? [];
      this.lowStock = stats?.lowStock ?? [];
      this.totalQuantitySold = stats?.totalQuantitySold ?? 0;
      this.totalOrders = stats?.totalOrders ?? 0;
      this.totalRevenue = stats?.totalRevenue ?? 0;
      this.cards = [
        { icon: 'sell', label: 'general.total-items-sold', value: this.totalQuantitySold, color: 'primary', tooltip: 'general.tooltip-items-sold' },
        { icon: 'receipt_long', label: 'general.total-orders', value: this.totalOrders, color: 'success', tooltip: 'general.tooltip-total-orders' },
        { icon: 'payments', label: 'general.total-revenue', value: this.totalRevenue, color: 'primary', currency: true, tooltip: 'general.tooltip-total-revenue' },
        { icon: 'calculate', label: 'general.average-order-value', value: this.averageOrderValue, color: 'info', currency: true, tooltip: 'general.tooltip-average-order-value' },
        { icon: 'groups', label: 'general.users', value: stats?.totalUsers ?? 0, color: 'primary', tooltip: 'general.tooltip-users' },
        { icon: 'add_shopping_cart', label: 'general.total-products', value: stats?.totalProducts ?? 0, color: 'success', tooltip: 'general.tooltip-total-products' },
      ];
    });
  }

  setFilter(type: DashboardDateFilter) {
    this.selectedFilter = type;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    switch (type) {
      case 'today':
        this.filter.groupBy = GroupByChartResult.day;
        this.filter.date = startOfToday;
        this.filter.endDate = endOfToday;
        break;
      case 'last7':
      case 'last30': {
        const days = type === 'last7' ? 7 : 30;
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - days);
        this.filter.groupBy = GroupByChartResult.day;
        this.filter.date = start;
        this.filter.endDate = now;
        break;
      }
      case 'month':
        this.filter.groupBy = GroupByChartResult.month;
        this.filter.date = undefined;
        this.filter.endDate = undefined;
        break;
      case 'year':
      default:
        this.filter.groupBy = GroupByChartResult.years;
        this.filter.date = undefined;
        this.filter.endDate = undefined;
        break;
    }
    this.getStats();
  }

  get chartLabelType(): string {
    return GroupByChartResult[this.filter.groupBy ?? GroupByChartResult.years];
  }

  get averageOrderValue(): number {
    if (!this.totalOrders || !this.totalRevenue) {
      return 0;
    }
    return Math.round((this.totalRevenue / this.totalOrders) * 100) / 100;
  }

  formatValue(value: number, currency: boolean = false): string {
    if (value === 0) {
      return '0';
    }
    const abs = Math.abs(value);
    if (abs >= 1000000) {
      return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
    }
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: currency ? 2 : 0,
    }).format(value);
  }

  formatValueFull(value: number, currency: boolean = false): string {
    const formatted = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: currency ? 2 : 0,
    }).format(value);
    return currency ? `${formatted} ${this.translate.instant('general.currency-short')}` : formatted;
  }

  toggleCard(index: number): void {
    this.expandedCardIndex = this.expandedCardIndex === index ? null : index;
  }
}
