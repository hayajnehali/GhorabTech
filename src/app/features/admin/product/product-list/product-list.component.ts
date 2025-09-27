import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router'; 
import { PageEvent } from '@angular/material/paginator'; 
import { Product, ProductFilter } from '@models/product';
import { environment } from '@shared/environment/environment';
import { ProductService } from '@shared/services/product.service';
import { NotificationService } from '@shared/services/notification.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  filter: ProductFilter = new ProductFilter();
  products: Product[] = [];
  imagesArray?: string[] = [];
  totalNumberOf: number = 0;
  environment=environment;
  constructor(
    private router: Router,
    private productService: ProductService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getAll(this.filter).subscribe({
      next: (req) => {
        this.products = req.data;
        this.totalNumberOf = req.totalNumberOf;
      },
    });
  }
  getImageUrl(fileName: Product): string {
    // this.imagesArray = fileName.imageUrl?.split('/&*').filter(Boolean);
    // let c = `${this.imagesArray![0]}`;
    // c = c.replace(/\s+/g, '');
    //return c;
    return "";
  }

  goBack() {
    this.router.navigate(['admin']);
  }
  goToAddProduct() {
    this.router.navigate(['admin/productManage']);
  }

  goDelete(arg0: number) {
    this.productService.delete(arg0).subscribe({
      next: (req) => {},
      complete: () => {
        this.notificationService.showSuccess();
        this.getProductList();
      },
    });
  }
  pageChanged(event: PageEvent) {
    this.filter.pageIndex = event.pageIndex + 1;
    this.filter.pageSize = event.pageSize;
    this.getProductList();
  }

  goEdit(arg0: number ) { 
      this.router.navigate(['admin/productManage/'+arg0]);
    }
  
  goView(arg0: number | undefined) {
    this.router.navigate(['admin/productView/'+arg0]);
  }
}
