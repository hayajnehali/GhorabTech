import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Product, ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';

@Component({
  selector: 'app-product-section',
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss',
  standalone: false,
})
export class ProductSectionComponent extends BaseListComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  fromSearch: boolean= false;
  constructor(readonly productService: ProductService) {
    super(productService, ProductFilter);
  }
  override ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.filter.productCategoryId =
        this.activatedRoute.snapshot.paramMap.get('productCategoryId') ?? null;
      this.filter.name =
        this.activatedRoute.snapshot.paramMap.get('nameOfProduct');
      this.loadData();
    });
    if (this.router.url.includes('user/category/list-product')) { 
      this.fromSearch = true;
    }
  }
}
