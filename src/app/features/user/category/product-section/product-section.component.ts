import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Product, ProductFilter, ProductResult } from '@models/product';
import {
  ProductCategory,
  ProductCategoryFilter,
  ProductCategoryResult,
} from '@models/product-category';
import { ProductCategoryService } from '@shared/services/product-category.service';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss',
})
export class ProductSectionComponent extends BaseListComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  constructor(private productService: ProductService) {
    super(productService, ProductFilter);
    this.filter.productCategoryId =
      this.activatedRoute.snapshot.paramMap.get('productCategoryId') ?? null;
  }
}
