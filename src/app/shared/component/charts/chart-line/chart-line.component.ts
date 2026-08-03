import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { ChartResult } from '@models/dashboard/chart-result';
import { GroupByChartResult } from '@shared/Enum/group-by-chart-result';
import { environment } from '@shared/environment/environment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ApexResponsive, ApexStroke, ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-chart-line',
  imports: [NgApexchartsModule],
  templateUrl: './chart-line.component.html',
  styleUrl: './chart-line.component.scss',
})
export class ChartLineComponent extends BaseComponent implements OnChanges {
  @Input() data: ChartResult[] = [];
  @Input() salesData: number[] = [];
  @Input() labels: string[] = [];
  @Input() labelType: string = GroupByChartResult[GroupByChartResult.years];
  @Input() seriesNameKey: string = 'general.number-sales';
  @Input() titleYearKey: string = 'general.sales-by-year';
  @Input() titleMonthKey: string = 'general.sales-by-month';
  @Input() titleDayKey: string = 'general.sales-by-day';

  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'line' as ChartType,
    height: 300,
    toolbar: { show: false },
    zoom: { enabled: false },
  };
  chartResponsive: ApexResponsive[] = [
    { breakpoint: 575, options: { chart: { height: 250 } } },
  ];
  chartStroke: ApexStroke = { curve: 'smooth', width: 3 };
  xAxis: ApexXAxis = { categories: [] };
  chartTitle: ApexTitleSubtitle = { text: '' };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.salesData = this.data?.map((item) => item.totalSales) || [];
      const isYears = this.labelType === GroupByChartResult[GroupByChartResult.years];
      const isDay = this.labelType === GroupByChartResult[GroupByChartResult.day];
      this.labels =
        isYears
          ? this.data?.map((item) => new Date(item.date).getFullYear().toString()) || []
          : isDay
          ? this.data?.map(
              (item) =>
                new Intl.DateTimeFormat(
                  localStorage.getItem(environment.language_KEY) ?? 'ar',
                  { day: 'numeric', month: 'numeric' }
                ).format(new Date(item.date))
            ) || []
          : this.data?.map(
              (item) =>
                new Intl.DateTimeFormat(
                  localStorage.getItem(environment.language_KEY) ?? 'ar',
                  { month: 'long' }
                ).format(new Date(item.date))
            ) || [];
      this.chartSeries = [{ name: this.translate.instant(this.seriesNameKey), data: this.salesData }];
      this.xAxis = {
        categories: this.labels,
        labels: {
          rotate: isDay ? -45 : 0,
          rotateAlways: isDay,
          hideOverlappingLabels: true,
          style: { fontSize: isDay ? '10px' : '14px' },
        },
      };
      this.chartTitle = {
        text:
          isYears
            ? this.translate.instant(this.titleYearKey)
            : isDay
            ? this.translate.instant(this.titleDayKey)
            : this.translate.instant(this.titleMonthKey),
      };
    }
  }
}
