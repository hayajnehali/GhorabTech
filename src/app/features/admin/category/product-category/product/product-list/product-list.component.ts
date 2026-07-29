import { Component } from '@angular/core';
import { Product, ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';
import { BaseListComponent } from '@core/base/base-ilst-component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  standalone: false,
})
export class ProductListComponent extends BaseListComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  canAdd = !this.routeTrackerService.getCurrentUrl()?.includes('admin/product');

  constructor(private productService: ProductService) {
    super(productService, ProductFilter);
    this.filter.productCategoryId =
      this.activatedRoute.snapshot.paramMap.get('productCategoryid') ?? null;
  }

  deleteProduct(data: ProductResult): void {
    if (
      !confirm(
        this.translate.instant('general.confirm-delete') ||
          'Are you sure you want to delete this product?',
      )
    ) {
      return;
    }
    this.productService.delete(data.id!).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          this.translate.instant('general.success-message'),
          this.translate.instant('general.success'),
        );
        this.loadData();
      },
      error: (err) => this.notificationService.showError(err),
    });
  }
}
