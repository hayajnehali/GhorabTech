import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryManageComponent } from './product-category-manage/product-category-manage.component';
import { RouterModule } from '@angular/router';
import { routesProductCategory } from './product-category-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MultiImageUploadComponent } from '@shared/component/img/multi-image-uplode/multi-image-upload.component';

@NgModule({
  declarations: [ProductCategoryListComponent, ProductCategoryManageComponent],
  imports: [CommonModule, SharedModule,RouterModule.forChild(routesProductCategory),MultiImageUploadComponent],
})
export class ProductCategoryModule {}
