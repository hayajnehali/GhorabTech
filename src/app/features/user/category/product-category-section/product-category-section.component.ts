import { Component } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { ProductCategory, ProductCategoryFilter, ProductCategoryResult } from '@models/product-category';
import { ProductCategoryService } from '@shared/services/product-category.service';

@Component({
  selector: 'app-product-category-section',
  templateUrl: './product-category-section.component.html',
  styleUrl: './product-category-section.component.scss'
})
export class ProductCategorySectionComponent extends BaseListComponent<ProductCategory,ProductCategoryResult,ProductCategoryFilter>{

  constructor(private productService:ProductCategoryService){
    super(productService,ProductCategoryFilter); 
        this.filter.CategoryId =  this.activatedRoute.snapshot.paramMap.get('id') ?? null;
  }

 
}
