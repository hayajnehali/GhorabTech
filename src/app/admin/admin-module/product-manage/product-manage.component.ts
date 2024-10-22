import { Component } from '@angular/core';
import { ProductService } from '../../../shared-module/services/product.service';
import { Product } from '../../../model/product';

@Component({
  selector: 'app-product-manage', 
  templateUrl: './product-manage.component.html',
  styleUrl: './product-manage.component.css'
})
export class ProductManageComponent {
  product:Product=new Product();
  constructor(private productService:ProductService){

  }


  async onSubmit() {
 await this.productService.create(this.product).subscribe()
    console.log('Product created:', this.product);
    // Handle the product object (e.g., send it to a service)
}

}

