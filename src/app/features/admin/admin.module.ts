import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AdminModuleRoutingModule } from './admin-routing.module'; 
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component'; 
import { AdminLayOutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';   
import { TruncatePipe } from '@shared/pipe/truncate.pipe';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from "@shared/component/footer/footer.component";  
import { ImageComponent } from '@shared/component/img/image/image.component';
import { MultiImageUploadComponent } from '@shared/component/img/multi-image-uplode/multi-image-upload.component';
import { AdminHeaderSectionComponent } from "./layout/admin-header-section/admin-header-section.component";
 
@NgModule({
  declarations: [ 
    AdminDashboardComponent, 
    AdminLayOutComponent,  
    TruncatePipe
  ],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    SharedModule,
    RouterModule,
    FooterComponent,
    ImageComponent,
    MultiImageUploadComponent,
    AdminHeaderSectionComponent
],exports:[
    AdminDashboardComponent
  ]
})
export class AdminModule { }
