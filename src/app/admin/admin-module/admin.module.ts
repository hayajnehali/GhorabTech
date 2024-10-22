import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminModuleRoutingModule } from './admin-routing.module';
import { ProductManageComponent } from './product-manage/product-manage.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductListComponent } from './product-list/product-list.component';


@NgModule({
  declarations: [ProductManageComponent, ProductListComponent],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    SharedModule,
    
  ]
})
export class AdminModule { }
