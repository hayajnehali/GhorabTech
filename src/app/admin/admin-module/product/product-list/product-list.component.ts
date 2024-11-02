import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../shared-module/services/product.service';
import { Product, ProductFilter } from '../../../../model/product';
import { PaginatedResult } from '../../../../model/paginated.result';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent implements OnInit {
  filter: ProductFilter = new ProductFilter();
 // products: PaginatedResult<Product[]> = new PaginatedResult<Product[]>;
  products:Product[] =  [];
  imagesArray?: string[] = [];
  
  constructor(private router: Router,private productService: ProductService) {

  }
  ngOnInit(): void {
    this.getProductList()
  }

  getProductList() {
    this.productService.getAll(this.filter).subscribe({
      next: (req) => {
        this.products = req.data;
        console.log(this.products)
      }
    })
  } 
   getImageUrl(fileName: Product): string {
    this.imagesArray = fileName.imageUrl?.split('/&*').filter(Boolean);
    let c= `${this.imagesArray![0]}`;  
    c = c.replace(/\s+/g, '');
    return fileName.productId ==4 ? c:"";
  }

  goBack(){
    this.router.navigate(['admin']);
  }
  goToAddProduct(){

    this.router.navigate(['admin/manageProduct']);
  }
}
