import { Component, OnInit } from '@angular/core'; 
import {
  ProductCategory,
  ProductCategoryFilter,
  ProductCategoryResult,
} from '@models/product-category';
import { ProductCategoryService } from '@shared/services/product-category.service'; 
import { BaseManageComponent } from '@core/base/base-manage-component'; 
@Component({
    selector: 'app-product-category-manage',
    templateUrl: './product-category-manage.component.html',
    styleUrl: './product-category-manage.component.scss',
    standalone: false
})
export class ProductCategoryManageComponent extends BaseManageComponent<
  ProductCategory,
  ProductCategoryResult,
  ProductCategoryFilter
> {
  constructor(private productCategoryService: ProductCategoryService) {
    super(productCategoryService,ProductCategory);
  }

  
 override ngOnInit(): void {
    this.entity.categoryId= this.activatedRoute.snapshot.paramMap.get('id')??undefined;
    const productCategoryid:string |null= this.activatedRoute.snapshot.paramMap.get('productCategoryid');
    if (productCategoryid !=null) {
      this.isAdd = false;
      this.getById(productCategoryid);
    } else {
      this.isAdd = true;
    }
    this.onInitData()
  }

  override processData(){ 
  }

}
