import { Component } from '@angular/core';
import {
  ProductCategory,
  ProductCategoryFilter,
  ProductCategoryResult,
} from '@models/product-category';
import { ProductCategoryService } from '@shared/services/product-category.service';
import { BaseListComponent } from '@core/base/base-ilst-component';

@Component({
    selector: 'app-product-category-list',
    templateUrl: './product-category-list.component.html',
    styleUrl: './product-category-list.component.scss',
    standalone: false
})
export class ProductCategoryListComponent extends BaseListComponent<
  ProductCategory,
  ProductCategoryResult,
  ProductCategoryFilter
> {
  constructor(private productCategoryService: ProductCategoryService) {
    super(productCategoryService,ProductCategoryFilter);
    this.displayedColumns = ['Id', 'categoryName', 'action'];
    this.filter.CategoryId = this.activatedRoute.snapshot.paramMap.get('id') ?? null;
  }
}
