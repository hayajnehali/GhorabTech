import { Component, inject, OnInit } from '@angular/core';
import { Product, ProductFilter, ProductResult } from '@models/product';
import { ProductService } from '@shared/services/product.service';
import { BaseManageComponent } from '@core/base/base-manage-component';
import { KeyAttributeService } from '@shared/services/key-attribute.service';
import { KeyAttributeFilter, KeyAttributeResult } from '@models/key-attribute';
import { KeyAttributeValue } from '@models/key-attribute-value';

@Component({
    selector: 'app-product-manage',
    templateUrl: './product-manage.component.html',
    styleUrl: './product-manage.component.scss',
    standalone: false
})
export class ProductManageComponent extends BaseManageComponent<
  Product,
  ProductResult,
  ProductFilter
> {
  keyAttributeService = inject(KeyAttributeService);
  keyAttributeList: KeyAttributeResult[] = [];
  keyAttributeValueId: string[] = [];
  constructor(private productService: ProductService) {
    super(productService, Product);
  }

  override ngOnInit(): void {
    this.entity.productCategoryId =
      this.activatedRoute.snapshot.paramMap.get('productCategoryid') ??
      undefined;
    const productId: string | null =
      this.activatedRoute.snapshot.paramMap.get('productId');
    if (productId != null) {
      this.isAdd = false;
      this.getById(productId);
    } else {
      this.isAdd = true;
    }
    this.getKeyAttribute();
  }
  override onLoadedData(req: any) {
    this.keyAttributeValueId = req.keyAttributeValues?.map(
      (k: any) => k.id
    ) as string[];
  }
  getKeyAttribute() {
    this.keyAttributeService
      .getAll(new KeyAttributeFilter())
      .subscribe((result) => {
        this.keyAttributeList = result.data ?? [];
      });
  }
  override processData() {
    this.keyAttributeValueId?.forEach(id => { 
      let keyAttributeValues:KeyAttributeValue=new KeyAttributeValue();
      keyAttributeValues.id=id;
      if(!this.entity.keyAttributeValues)
      this.entity.keyAttributeValues=[];
    if(!this.entity.keyAttributeValues.find(k=>k.id==id))
      this.entity.keyAttributeValues.push( keyAttributeValues);
    
    });
  }
}
