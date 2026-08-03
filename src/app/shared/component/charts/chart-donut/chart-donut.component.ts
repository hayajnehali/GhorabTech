import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { PaymentMethodResult } from '@models/dashboard/payment-method';
import { NgApexchartsModule } from 'ng-apexcharts';
import {
  ApexChart,
  ApexDataLabels,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTooltip,
} from 'ng-apexcharts';

@Component({
  selector: 'app-chart-donut',
  imports: [NgApexchartsModule],
  templateUrl: './chart-donut.component.html',
  styleUrl: './chart-donut.component.scss',
})
export class ChartDonutComponent extends BaseComponent implements OnChanges {
  @Input() data: PaymentMethodResult[] = [];

  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'donut' as any,
    height: 300,
  };
  chartResponsive: ApexResponsive[] = [];
  chartLabels: string[] = [];
  chartTitle: ApexTitleSubtitle = { text: '' };
  chartLegend: ApexLegend = { position: 'bottom' };
  chartDataLabels: ApexDataLabels = {
    formatter: (value: number) => value.toFixed(0) + '%',
  };
  chartTooltip: ApexTooltip = {
    y: {
      formatter: (value: number) => value.toLocaleString(),
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.chartLabels = this.data.map((item) =>
        this.translate.instant('paymentMethod.' + (item.paymentMethod === 0 ? 'Visa' : 'Cliq'))
      );
      this.chartSeries = this.data.map((item) => item.totalOrders);
      this.chartLegend = { position: 'bottom' };
      this.chartDataLabels = {
        formatter: (value: number) => value.toFixed(0) + '%',
      };
      this.chartTooltip = {
        y: {
          formatter: (value: number) =>
            value.toLocaleString() + ' ' + this.translate.instant('general.orders'),
        },
      };
      this.chartTitle = {
        text: this.translate.instant('general.sales-by-payment-method'),
      };
    }
  }
}
