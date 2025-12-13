import { Component, inject, OnInit } from '@angular/core';
import { ChartResult, ChartResultFilter } from '@models/chart-result';
import { ProductFilter } from '@models/product';
import { UserFilter } from '@models/user';
import { GroupByChartResult } from '@shared/Enum/group-by-chart-result';
import { CartItemService } from '@shared/services/cart-item.service';
import { ProductService } from '@shared/services/product.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false,
})
export class DashboardComponent implements OnInit {
  selectedYear: any;

  cartItemService = inject(CartItemService);
  userService = inject(UserService);
  productService = inject(ProductService);

  data: ChartResult[] = [];
  filter = new ChartResultFilter();
  groupByChartResult: typeof GroupByChartResult = GroupByChartResult;
  totalUsers: number=0;
  totalProducts: number=0;

  constructor() {
    this.filter.groupBy = GroupByChartResult.years;
  }
  ngOnInit(): void {
    this.getSalesVolume();
    this.getTotalProduct();
    this.getTotalUsers();
  }
  getSalesVolume() {
    this.cartItemService.getSalesVolume(this.filter).subscribe((res) => {
      this.data = res.data ?? []; 
    });
  }
  getTotalUsers() {
    this.userService.getTotalUsers(new UserFilter).subscribe((res) => {
      this.totalUsers = res.data ?? 0;
    });
  }
  getTotalProduct() {
    this.productService.getTotalProduct(new ProductFilter).subscribe((res) => {
      this.totalProducts = res.data ?? 0;
    });
  }

  setGroupByAndLoad(type: GroupByChartResult) {
    this.filter.groupBy = type;
    this.getSalesVolume();
  }
  updateChart(year: number) {
    this.filter.date = new Date(year).toISOString();  
    this.getSalesVolume();  
  }
}
