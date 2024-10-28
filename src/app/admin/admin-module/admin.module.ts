import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-routing.module';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavBarComponent } from './admin-nav-bar/admin-nav-bar.component';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    AdminDashboardComponent,
    AdminNavBarComponent],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    SharedModule
  ],exports:[
    AdminDashboardComponent
  ]
})
export class AdminModule { }
