import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestUserRoutingModule } from './guest-user-routing.module'; 
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainComponent } from './main/main.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';      
import { ProductService } from '../shared-module/services/product.service';
import { GenericService } from '../shared-module/services/base.service';
import { SharedModule } from '../shared-module/shared.module';
import { GuestLayOutComponent } from './layout/guest-layout/guest-layout.component';
import { ProductListComponent } from './Product/product-list/product-list.component'; 


@NgModule({
  declarations: [
    MainComponent, 
    NavBarComponent,
    SliderHomeComponent, 
    GuestLayOutComponent, 
    ProductListComponent
    
  ],
  imports: [
    CommonModule,
    GuestUserRoutingModule,
    SharedModule
  ] , providers:[GenericService,ProductService ]
})
export class GuestUserModule { }
