import { Component, OnInit } from '@angular/core';
import { ProductService } from '@shared/services/product.service';
import {
  Product,
  ProductFilter,
  ProductResult,
} from '../../../../model/product';
import { environment } from '@shared/environment/environment';
import { ProductCategoryService } from '@shared/services/product-category.service';
import {
  ProductCategory,
  ProductCategoryFilter,
} from '../../../../model/product-category';
import { NotificationService } from '@shared/services/notification.service';
import { ProductImage } from '@models/Images';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    standalone: false
})
export class ProductListComponent implements OnInit {
  filter: ProductFilter = new ProductFilter();
  products: ProductResult[] = [new ProductResult()];

  totalNumberOf: number = 0;
  environment = environment;
  data: any[] = []; // Array to store API data
  totalRecords = 0; // Total records count from API
  pageSize = 10; // Default page size
  currentPage = 0; // Current page index
  productCategorys: ProductCategory[] = [];

  constructor(
    private productService: ProductService,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationService
  ) {
    this.products[0].images = [new ProductImage()];
  }
  ngOnInit(): void {
    this.getProductCategorys();
    this.getProductList();
  }

  getProductList() {
    this.productService.getAll(this.filter).subscribe({
      next: (req) => {
        if (req.data == null) {
          this.products = req.data!;
          this.totalNumberOf = req.totalNumberOf;
        }
      },
    });
  }

  getProductCategorys() {
    this.productCategoryService.getAll(new ProductCategoryFilter()).subscribe({
      next: (res) => {
        if (res.data) {
          this.productCategorys = res.data!;
        }
      },
      complete() {},
      error: (error) => {
        this.notificationService.showError(error);
      },
    });
  }

  onPageChange(event: any) {
    this.filter.pageIndex = event.pageIndex + 1; // Update current page
    this.filter.pageSize = event.pageSize; // Update page size
    this.getProductList(); // Fetch new data
  }
}
