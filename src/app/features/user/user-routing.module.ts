import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductSectionComponent } from './category/product-section/product-section.component'; 
import { RegistrationComponent } from '@shared/component/registration/registration.component';

const userRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'product/:nameOfProduct',
    component: ProductSectionComponent,
  },
  // {
  //   path: 'login',
  //   component: LoginComponent,
  // },
  {
    path: 'register',
    component: RegistrationComponent,
  }, 
  {
    path: 'category',
    loadChildren: () =>
      import('./category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'cart',
    component: CartViewComponent,
  },
  {
    path: 'pay',
    component: PaymentComponent,
  }, 
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
