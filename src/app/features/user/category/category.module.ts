import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategorySectionComponent } from './product-category-section/product-category-section.component';
import { SharedModule } from '@shared/shared.module';
import { ImageComponent } from "@shared/component/img/image/image.component";
import { RouterModule } from '@angular/router';
import { categoryRoutes } from './category-routing.module'; 
import { ProductSectionComponent } from './product-section/product-section.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ReviewsSectionComponent } from "../user-shared-section/reviews-section/reviews-section.component";
import { PaginationComponent } from "@shared/component/pagination/pagination.component";
import { Swiper } from 'swiper';
import { register } from 'swiper/element/bundle';
register();
@NgModule({
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductCategorySectionComponent, 
    ProductSectionComponent, ProductViewComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(categoryRoutes),
    SharedModule,
    ImageComponent,
    ReviewsSectionComponent,
    PaginationComponent
],exports:[ 
]
})
export class CategoryModule { }
