import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared-module/services/product.service';
import { Product, ProductFilter } from '../../../model/product';
import { PaginatedResult } from '../../../model/paginated.result';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  filter: ProductFilter = new ProductFilter();
  products: PaginatedResult<Product[]> = new PaginatedResult<Product[]>;
  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    this.productService.getAll(this.filter).subscribe({
      next: (req) => {
        this.products = req;
        console.log(this.products)
      }
    })
  }
}
