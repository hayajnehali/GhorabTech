import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateModule } from '@ngx-translate/core'; 
import { TopBarComponent } from "@shared/component/top-header/top-bar.component";  
import { ResponsiveService } from '@shared/services/responsive.service';
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-admin-header-section',
    imports: [CommonModule, TranslateModule, TopBarComponent, MatIcon],
    templateUrl: './admin-header-section.component.html',
    styleUrl: './admin-header-section.component.scss'
})
export class AdminHeaderSectionComponent {

  links: SocialLink[]  = SOCIAL_LINKS;
  responsiveService = inject(ResponsiveService);
  constructor(private router: Router) {}


}
