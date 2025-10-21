import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesProduct } from './product-routing.module';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { MultiImageUploadComponent } from "@shared/component/img/multi-image-uplode/multi-image-upload.component";
import { ImageComponent } from "@shared/component/img/image/image.component";
import { FormErrorComponent } from "@shared/component/form-error/form-error.component";

@NgModule({
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    ProductViewComponent
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routesProduct), MultiImageUploadComponent, ImageComponent, FormErrorComponent],
})
export class ProductModule {}
