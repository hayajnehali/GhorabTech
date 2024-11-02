import { Component } from '@angular/core';
import { ProductCategory } from '../../../../model/product-category';
import { ProductCategoryService } from '../../../../shared-module/services/product-category.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../shared-module/services/notification.service';

@Component({
  selector: 'app-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrl: './category-manage.component.scss',
})
export class CategoryManageComponent {
  productCategory: ProductCategory = new ProductCategory();

  constructor(
    private productCategoryService: ProductCategoryService,
    private notificationService:NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    this.productCategoryService.create(this.productCategory).subscribe({
      next: () => {},
      complete: () => {
        this.notificationService.showSuccess();
      },
    });
  }

  goBack() {
    this.router.navigate(['admin/categorys']);
  }
}
