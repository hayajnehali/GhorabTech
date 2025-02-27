import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './Product/product-list/product-list.component';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'product',
    component:ProductListComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuestUserRoutingModule { }
