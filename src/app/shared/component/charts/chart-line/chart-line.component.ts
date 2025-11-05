import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseComponent } from '@core/base/base-component';
import { ChartResult } from '@models/chart-result';
import { GroupByChartResult } from '@shared/Enum/group-by-chart-result';
import { environment } from '@shared/environment/environment';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexChart, ChartType } from 'ng-apexcharts';
import { groupBy } from 'rxjs';

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
  @Input() labelType: string= GroupByChartResult[GroupByChartResult.years];

  //   sales: number[] = []; //[120, 150, 180, 200];
  // years: string[] = []; //['2020', '2021', '2022', '2023'];
  // months: string[] = []; //['يناير', 'فبراير', 'مارس', 'أبريل'];

  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'line' as ChartType,
    height: 350,
  };
  xAxis: ApexXAxis = { categories: [] };
  chartTitle: ApexTitleSubtitle = { text: '' };

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data && this.data.length > 0) {
      this.salesData = this.data?.map((item) => item.totalSales) || [];
      this.labels =  this.labelType ===GroupByChartResult[GroupByChartResult.years]?
       this.data?.map((item) =>new Date(item.date).getFullYear().toString() ) || []:
       this.data?.map((item) => new Intl.DateTimeFormat(localStorage.getItem(environment.language_KEY)??"ar", { month: 'long' }).format(new Date(item.date))) || []
       ;
      this.chartSeries = [{ name:this.translate.instant("general.number-sales"), data: this.salesData }];
      this.xAxis = { categories: this.labels };
      this.chartTitle = {
        text:
          this.labelType ===GroupByChartResult[GroupByChartResult.years]
            ?   this.translate.instant("general.sales-by-year")
            :  this.translate.instant("general.sales-by-month"),
      };
    }
  }
}
