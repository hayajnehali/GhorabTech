import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core'; 
import { TopBarComponent } from "@shared/component/top-header/top-bar.component"; 
import { LoginLogoutButtonComponent } from "@shared/component/login-logout-button/login-logout-button.component";
import { LanguageButtonComponent } from "@shared/component/language-button/language-button.component";
import { ResponsiveService } from '@shared/services/responsive.service';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-admin-header-section',
    imports: [CommonModule, TranslateModule, TopBarComponent, LoginLogoutButtonComponent, LanguageButtonComponent, MatIcon],
    templateUrl: './admin-header-section.component.html',
    styleUrl: './admin-header-section.component.scss'
})
export class AdminHeaderSectionComponent {

  links: SocialLink[]  = SOCIAL_LINKS;
  responsiveService = inject(ResponsiveService);
  constructor(private router: Router) {}


}
