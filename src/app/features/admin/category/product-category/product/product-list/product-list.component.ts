import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { PageEvent } from '@angular/material/paginator'; 
import { Product, ProductFilter, ProductResult } from '@models/product';
import { environment } from '@shared/environment/environment';
import { ProductService } from '@shared/services/product.service'; 
import { BaseListComponent } from '@core/base/base-ilst-component';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent extends BaseListComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  constructor( private productService: ProductService) {
    super(productService,ProductFilter);
    this.displayedColumns = ['id', 'name', 'price','priceBeforeDiscount','count', 'action'];
     this.filter.productCategoryId =  this.activatedRoute.snapshot.paramMap.get('productCategoryid') ?? null;
     
  }
 
 
}
