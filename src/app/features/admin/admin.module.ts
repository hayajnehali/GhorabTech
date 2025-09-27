import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminModuleRoutingModule } from './admin-routing.module';
import { ProductManageComponent } from './product/product-manage/product-manage.component'; 
import { ProductListComponent } from './product/product-list/product-list.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminNavBarComponent } from './layout/admin-nav-bar/admin-nav-bar.component';
import { AdminLayOutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router'; 
import { CategoryListComponent } from './product-category/category-list/category-list.component'; 
import { CategoryManageComponent } from './product-category/category-manage/category-manage.component';
import { ProductViewComponent } from './product/product-view/product-view.component'; 
import { TruncatePipe } from '@shared/pipe/truncate.pipe';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from "@shared/component/footer/footer.component";  
import { ImageComponent } from '@shared/component/img/image/image.component';
import { MultiImageUploadComponent } from '@shared/component/img/multi-image-uplode/multi-image-upload.component';
// import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    ProductManageComponent,
    ProductListComponent,
    AdminDashboardComponent,
    AdminNavBarComponent,
    AdminLayOutComponent, 
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
    FooterComponent,
    ImageComponent,
    MultiImageUploadComponent
],exports:[
    AdminDashboardComponent
  ]
})
export class AdminModule { }
