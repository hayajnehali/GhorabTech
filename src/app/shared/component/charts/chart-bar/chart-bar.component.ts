import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { TopProductResult } from '@models/dashboard/top-product';
import { environment } from '@shared/environment/environment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ApexPlotOptions, ApexResponsive, ApexStroke, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-bar',
  imports: [NgApexchartsModule],
  templateUrl: './chart-bar.component.html',
  styleUrl: './chart-bar.component.scss',
})
export class ChartBarComponent extends BaseComponent implements OnChanges {
  @Input() data: TopProductResult[] = [];

  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'bar' as ChartType,
    height: 300,
    toolbar: { show: false },
  };
  chartResponsive: ApexResponsive[] = [
    { breakpoint: 575, options: { chart: { height: 250 } } },
  ];
  chartStroke: ApexStroke = { curve: 'smooth', width: 3 };
  xAxis: ApexXAxis = { categories: [] };
  chartTitle: ApexTitleSubtitle = { text: '' };
  chartPlotOptions: ApexPlotOptions = {
    bar: {
      horizontal: true,
      barHeight: '40%',
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      const isAr = (localStorage.getItem(environment.language_KEY) ?? 'ar') === 'ar';
      this.xAxis = {
        categories: this.data?.map((item) => item.name?.local ?? (isAr ? item.name?.arabic : item.name?.english)) || [],
      };
      this.chartSeries = [
        {
          name: this.translate.instant('general.total-items-sold'),
          data: this.data?.map((item) => item.totalQuantity) || [],
        },
      ];
      this.chartTitle = {
        text: this.translate.instant('general.best-selling-products'),
      };
    }
  }
}
