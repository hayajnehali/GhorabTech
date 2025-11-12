import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './category/product-category/product/product-list/product-list.component';
import { SliderComponent } from './dashboard/slider/slider.component';
import { SliderListComponent } from './dashboard/slider-list/slider-list.component';
export const routesAdmin: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      showInSidebar: false,
    },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    data: {
      label: 'dashboard.dashboard',
      icon: 'analytics',
      showInSidebar: true,
    },
  },
  {
    path: 'slider-list',
    component: SliderListComponent,
    data: {
      label: 'slider.sliders',
      icon: 'analytics',
      showInSidebar: true,
    },
  },
  {
    path: 'product',
    component: ProductListComponent,
    data: {
      label: 'product.product-list',
      icon: 'drag_handle',
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
  // أي مسار غير معروف داخل user
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routesAdmin)],
  exports: [RouterModule],
})
export class AdminModuleRoutingModule {}
