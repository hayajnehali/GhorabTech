import { Routes } from '@angular/router';
import { ProductCategoryListComponent } from './product-category-list/product-category-list.component';
import { ProductCategoryManageComponent } from './product-category-manage/product-category-manage.component';

export const routesProductCategory: Routes = [
  {
    path: '',
    component: ProductCategoryListComponent,
  },
  {
    path: 'manage',
    component: ProductCategoryManageComponent,
  },
  {
    path: 'manage/:productCategoryid',
    component: ProductCategoryManageComponent,
  },
  {
    path: ':productCategoryid/product',
    loadChildren: () =>
      import('./product/product.module').then(
        (m) => m.ProductModule
      ),
  },
];
