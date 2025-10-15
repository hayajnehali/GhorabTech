import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MainComponent } from './main/main.component';
import { SliderHomeComponent } from './layout/slider-home/slider-home.component';
import { ProductService } from '@shared/services/product.service';
import { SharedModule } from '@shared/shared.module';
import { UserLayOutComponent } from './layout/user-layout/user-layout.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { UserRoutingModule } from './user-routing.module';
import { SectionProductComponent } from './Product/section-product/section-product.component';
import { ServiceBase } from '@shared/services/base.service';
import { InquiriesSectionComponent } from './user-shared-section/inquiries-section/inquiries-section.component';
import { ReviewsSectionComponent } from './user-shared-section/reviews-section/reviews-section.component';
import { FooterComponent } from '@shared/component/footer/footer.component';
import { ImageComponent } from '@shared/component/img/image/image.component';
import { CategoryModule } from './category/category.module';
import { CategorySectionComponent } from "./user-shared-section/category-section/category-section.component";
import { CardSidenavComponent } from './layout/card-sidenav/card-sidenav.component'; 
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    MainComponent, 
    SliderHomeComponent,
    UserLayOutComponent,
    ProductListComponent,
    SectionProductComponent,
    CardSidenavComponent,
    CartViewComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ImageComponent,
    InquiriesSectionComponent,
    ReviewsSectionComponent,
    FooterComponent,
    CategoryModule,
    CategorySectionComponent,
],
  providers: [ServiceBase, ProductService],
})
export class UserModule {}
