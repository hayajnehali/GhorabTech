import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductManageComponent } from './product-manage/product-manage.component'; 
import { ProductListComponent } from './product-list/product-list.component'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

const routes: Routes = [
{
  path:"",
  component:AdminDashboardComponent
}, 
{
  path:'manageProduct',
  component:ProductManageComponent
},
{
  path:'products',
  component:ProductListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminModuleRoutingModule { }
