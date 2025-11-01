import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
export const routesAdmin: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      label: 'dashboard.dashboard',
      icon: 'merge_type',
      showInSidebar: true,
    },
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
    data: {
      label: 'category.category',
      icon: 'merge_type',
      showInSidebar: true,
    },
  },
  {
    path: 'keyAttribute',
    loadChildren: () =>
      import('./key-attribute/key-attribute.module').then(
        (m) => m.KeyAttributeModule
      ),
    data: {
      label: 'keyAttribute.key-attribute',
      icon: 'category',
      showInSidebar: true,
    },
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
    data: { 
      label: 'cart.cart-list',
      icon: 'shopping_cart',
      showInSidebar: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}
