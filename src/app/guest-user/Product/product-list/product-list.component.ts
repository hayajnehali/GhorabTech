import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared-module/services/product.service';
import { Product, ProductFilter } from '../../../model/product';
import { environment } from '../../../shared-module/environment/environment';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit{
  filter: ProductFilter = new ProductFilter();
  products:Product[]=[new Product()]; 
  totalNumberOf: number=0;
  environment=environment
constructor(private productService:ProductService){

}
  ngOnInit(): void {
   this.getProductList()
  }
  
  getProductList() {
    this.productService.getAll(this.filter).subscribe({
      next: (req) => {
        this.products = req.data;
        this.totalNumberOf = req.totalNumberOf;
      },
    });
  }
}
