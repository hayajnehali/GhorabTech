import { Component, OnInit } from '@angular/core';  
import { Product, ProductFilter, ProductResult } from '@models/product';  
import { ProductService } from '@shared/services/product.service'; 
import { BaseManageComponent } from '@core/base/base-manage-component';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.scss',
})
export class ProductManageComponent extends BaseManageComponent<
  Product,
  ProductResult,
  ProductFilter
> {
      
  constructor(
    private productService: ProductService,  
  ) {
    super(productService,Product);
  }

    
 override ngOnInit(): void {
    this.entity.productCategoryId= this.activatedRoute.snapshot.paramMap.get('productCategoryid')??undefined;
    const productId:string |null= this.activatedRoute.snapshot.paramMap.get('productId');
    if (productId !=null) {
      this.isAdd = false;
      this.getById(productId);
    } else {
      this.isAdd = true;
    }
    this.onInitData()
  }
 
}
