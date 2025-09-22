import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared-module/services/product.service';
import { Images, Product, ProductFilter } from '../../../model/product';
import { environment } from '../../../shared-module/environment/environment';
import { ProductCategoryService } from '../../../shared-module/services/product-category.service';
import { ProductCategory, ProductCategoryFilter } from '../../../model/product-category';
import { NotificationService } from '../../../shared-module/services/notification.service';

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
  data: any[] = []; // Array to store API data
  totalRecords = 0; // Total records count from API
  pageSize = 10; // Default page size
  currentPage = 0; // Current page index
  productCategorys: ProductCategory[]=[];

constructor(private productService:ProductService,
  private productCategoryService:ProductCategoryService,
private notificationService:NotificationService){
this.products[0].images=[new Images]
}
  ngOnInit(): void {
    this.getProductCategorys()
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


getProductCategorys(){
  this.productCategoryService.getAll(new ProductCategoryFilter()).subscribe({
    next:(res)=>{
this.productCategorys=res.data
    },
    complete() {
      
    },error:(error)=>{
      this.notificationService.showError(error);
    }
  })
}

  onPageChange(event: any) {
    this.filter.pageIndex = event.pageIndex+1; // Update current page
    this.filter.pageSize = event.pageSize; // Update page size
    this.getProductList(); // Fetch new data
  }


}
