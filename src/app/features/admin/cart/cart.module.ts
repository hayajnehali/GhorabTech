import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { routesCart } from './cart-routing.module';
import { CartListComponent } from './cart-list/cart-list.component';
import { A11yModule } from "@angular/cdk/a11y";
import { CartItemListComponent } from './cart-item-list/cart-item-list.component';
import { ImageComponent } from "@shared/component/img/image/image.component";

@NgModule({
  declarations: [CartListComponent, CartItemListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routesCart), A11yModule, ImageComponent],
})
export class CartModule {}
