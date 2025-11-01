import { Routes } from '@angular/router';
import { CartListComponent } from './cart-list/cart-list.component';
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';

export const routesCart: Routes = [
  {
    path: '',
    component: CartListComponent,
  },
  {
    path: ':id/cart-item-list',
    component: CartItemListComponent,
  },
];
