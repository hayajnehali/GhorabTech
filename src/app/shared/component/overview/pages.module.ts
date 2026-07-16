import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PagesRoutingModule } from './pages-routing.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    PrivacyComponent,
    TermsComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    PagesRoutingModule,
  ],
})
export class PagesModule {}
