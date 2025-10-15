import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductCategorySectionComponent } from './category/product-category-section/product-category-section.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'product',
    component: ProductListComponent,
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path:'cart',
    component:CartViewComponent
  },{
    path:"pay",
    component:PaymentComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
