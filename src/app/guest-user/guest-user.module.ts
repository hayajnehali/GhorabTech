import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuestUserRoutingModule } from './guest-user-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainComponent } from './main/main.component';
import { SliderHomeComponent } from './slider-home/slider-home.component';  
import { ProductCardComponent } from './Product/product-card/product-card.component';   
import { ProductService } from '../shared-module/services/product.service';
import { GenericService } from '../shared-module/services/base.service';
import { SharedModule } from '../shared-module/shared.module';


@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    NavBarComponent,
    SliderHomeComponent,
    ProductCardComponent,
    
  ],
  imports: [
    CommonModule,
    GuestUserRoutingModule,
    SharedModule
  ] , providers:[GenericService,ProductService ]
})
export class GuestUserModule { }
