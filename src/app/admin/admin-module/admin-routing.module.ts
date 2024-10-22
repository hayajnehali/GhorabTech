import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { ProductCardComponent } from '../../shared-module/component/product-card/product-card.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
  path:'',
  component:ProductManageComponent
},
{
  path:'products',
  component:ProductCardComponent
},
{
  path:'productList',
  component:ProductListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
