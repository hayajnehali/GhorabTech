import { Component, OnInit } from '@angular/core'; 
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ProductCategory } from '../../../model/product-category';
import { ProductCategoryService } from '../../../shared-module/services/product-category.service';
import { NotificationService } from '../../../shared-module/services/notification.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrl: './category-manage.component.scss',
})
export class CategoryManageComponent implements OnInit{
  productCategory: ProductCategory = new ProductCategory();
  isAdd: boolean=false;

  constructor(
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('productCategoryId'));
    if (id > 0) {
      this.isAdd = false;
      this.getById(id)
    } else {
      this.isAdd = true; 
    } 
  }
  getById(arg0:number) {
   this.productCategoryService.getById(arg0).subscribe({
    next:(req)=>{
      this.productCategory=req
    }
   })
  }

  onSubmit() {
    if(this.isAdd){
      this.productCategoryService.create(this.productCategory).subscribe({
        next: () => {},
        complete: () => {
          this.notificationService.showSuccess();
        },
      });
    }else{
      this.productCategoryService.update(this.productCategory).subscribe({
        next: () => {},
        complete: () => {
          this.notificationService.showSuccess();
        },
      });
    }

  }

  goBack() {
    this.router.navigate(['admin/categorys']);
  }
}
