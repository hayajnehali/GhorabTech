import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainComponent } from './main/main.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';      
import { ProductService } from '../shared-module/services/product.service';
import { GenericService } from '../shared-module/services/base.service';
import { SharedModule } from '../shared-module/shared.module';
import { UserLayOutComponent } from './layout/user-layout/user-layout.component';
import { ProductListComponent } from './Product/product-list/product-list.component'; 
import { UserRoutingModule } from './user-routing.module';


@NgModule({
  declarations: [
    MainComponent, 
    NavBarComponent,
    SliderHomeComponent, 
    UserLayOutComponent, 
    ProductListComponent
    
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ] , providers:[GenericService,ProductService ]
})
export class UserModule { }
