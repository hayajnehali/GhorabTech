import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModuleRoutingModule } from './admin-routing.module'; 
import { AdminLayOutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '@shared/pipe/truncate.pipe';
import { SharedModule } from '@shared/shared.module';
import { FooterComponent } from '@shared/component/footer/footer.component';
import { ImageComponent } from '@shared/component/img/image/image.component';
import { MultiImageUploadComponent } from '@shared/component/img/multi-image-uplode/multi-image-upload.component';
import { AdminHeaderSectionComponent } from './layout/admin-header-section/admin-header-section.component';
import { LoginLogoutButtonComponent } from '@shared/component/login-logout-button/login-logout-button.component';
import { LanguageButtonComponent } from '@shared/component/language-button/language-button.component';

@NgModule({
  declarations: [AdminLayOutComponent, TruncatePipe],
  imports: [
    CommonModule,
    AdminModuleRoutingModule,
    SharedModule,
    RouterModule,
    FooterComponent,
    ImageComponent,
    MultiImageUploadComponent,
    AdminHeaderSectionComponent,
    LoginLogoutButtonComponent,
    LanguageButtonComponent,
  ],
  exports: [],
})
export class AdminModule {}
