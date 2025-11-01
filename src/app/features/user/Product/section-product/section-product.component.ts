import { Component } from '@angular/core';  
import { ProductService } from '@shared/services/product.service';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { Product, ProductFilter, ProductResult } from '@models/product';

@Component({
    selector: 'app-section-product',
    templateUrl: './section-product.component.html',
    styleUrl: './section-product.component.scss',
    standalone: false
})
export class SectionProductComponent extends BaseListComponent<Product,ProductResult,ProductFilter>{

  constructor(private productService:ProductService){
    super(productService,ProductFilter);
  }

 
}
