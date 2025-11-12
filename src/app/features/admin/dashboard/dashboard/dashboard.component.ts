import { Component, inject, OnInit } from '@angular/core';
import { ChartResult, ChartResultFilter } from '@models/chart-result';
import { GroupByChartResult } from '@shared/Enum/group-by-chart-result';
import { CartItemService } from '@shared/services/cart-item.service'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  selectedYear: any;

  cartItemService = inject(CartItemService);

  data: ChartResult[] = [];
  filter = new ChartResultFilter();
  groupByChartResult: typeof GroupByChartResult = GroupByChartResult;

  constructor() {
    this.filter.groupBy = GroupByChartResult.years;
  }
  ngOnInit(): void {
    this.GetSalesVolume();
  }
  GetSalesVolume() {
    this.cartItemService.getSalesVolume(this.filter).subscribe((res) => {
      this.data = res.data ?? [];
    });
  }

  setGroupByAndLoad(type: GroupByChartResult) {
    this.filter.groupBy = type;
    this.GetSalesVolume();
  }
updateChart(year: number) { 
  this.filter.date =  new Date(year).toISOString();  // تأكد أن `this.filter.date` هو المكان الصحيح للمرور به بالتاريخ
  this.GetSalesVolume();    // استدعاء الوظيفة للحصول على المبيعات بناءً على التاريخ
}

}
