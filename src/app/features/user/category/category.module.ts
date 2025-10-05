import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategorySectionComponent } from './product-category-section/product-category-section.component';
import { SharedModule } from '@shared/shared.module';
import { ImageComponent } from "@shared/component/img/image/image.component";
import { RouterModule } from '@angular/router';
import { categoryRoutes } from './category-routing.module'; 
import { ProductSectionComponent } from './product-section/product-section.component';
import { ProductViewComponent } from './product-view/product-view.component';

@NgModule({
  declarations: [
    ProductCategorySectionComponent, 
    ProductSectionComponent, ProductViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule,
    ImageComponent
],exports:[ 
]
})
export class CategoryModule { }
