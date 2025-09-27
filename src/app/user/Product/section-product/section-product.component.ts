import { Component } from '@angular/core';
import { BaseListComponent } from '../../../core/component/base-ilst-component';
import { Product, ProductFilter, ProductResult } from '../../../model/product';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'app-section-product',
  templateUrl: './section-product.component.html',
  styleUrl: './section-product.component.scss'
})
export class SectionProductComponent extends BaseListComponent<Product,ProductResult,ProductFilter>{

  constructor(private productService:ProductService){
    super(productService);
  }

   getProductChunks(chunkSize: number): ProductResult[][] {
    const chunks: ProductResult[][] = [];
    for (let i = 0; i < this.items.length; i += chunkSize) {
      chunks.push(this.items.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
