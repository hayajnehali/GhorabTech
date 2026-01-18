import { Routes } from '@angular/router';
import { ProductCategorySectionComponent } from './product-category-section/product-category-section.component';
import { ProductSectionComponent } from './product-section/product-section.component';
import { ProductViewComponent } from './product-view/product-view.component';

export const categoryRoutes: Routes = [
  {
    path: ':id/product-category',
    component: ProductCategorySectionComponent,
  },
  {
    path: ':id/product-category/:productCategoryId',
    component: ProductCategorySectionComponent,
  },
  {
    path: ':id/product-category/:productCategoryId/product',
    component: ProductSectionComponent,
  },
  {
    path: ':id/product-category/:productCategoryId/product/:productId',
    component: ProductViewComponent,
  },

  {
    path: 'list-product/:nameOfProduct',
    component: ProductSectionComponent,
  },
  {
    path: 'view-product/:productId',
    component: ProductViewComponent,
  },
];
