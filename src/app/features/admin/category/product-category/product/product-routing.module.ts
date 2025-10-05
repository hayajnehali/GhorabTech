import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductViewComponent } from './product-view/product-view.component';
export const routesProduct: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'manage',
    component: ProductManageComponent,
  },
  {
    path: 'manage/:productId',
    component: ProductManageComponent,
  },
  {
    path: 'productView/:productId',
    component: ProductViewComponent,
  },
];
