import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-routing.module';
import { ProductManageComponent } from './product/product-manage/product-manage.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductListComponent } from './product/product-list/product-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavBarComponent } from './layout/admin-nav-bar/admin-nav-bar.component';
import { AdminLayOutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component'; 
import { CategoryListComponent } from './product-category/category-list/category-list.component'; 
import { CategoryManageComponent } from './product-category/category-manage/category-manage.component';
import { ProductViewComponent } from './product/product-view/product-view.component';
import { TruncatePipe } from '../../shared-module/pipe/truncate.pipe';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    AdminDashboardComponent,
    AdminNavBarComponent,
    AdminLayOutComponent,
    AdminFooterComponent, 
    CategoryListComponent, 
    CategoryManageComponent, 
    ProductViewComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    SharedModule,
    RouterModule,
  ],exports:[
    AdminDashboardComponent
  ]
})
export class AdminModule { }
