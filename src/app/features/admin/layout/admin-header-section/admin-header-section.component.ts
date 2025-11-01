import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@shared/environment/environment';

@Component({
    selector: 'app-admin-header-section',
    imports: [CommonModule, TranslateModule],
    templateUrl: './admin-header-section.component.html',
    styleUrl: './admin-header-section.component.scss'
})
export class AdminHeaderSectionComponent {
    language=environment.language_KEY
  currentLang: string | null = localStorage.getItem(this.language);
  links: SocialLink[]  = SOCIAL_LINKS;
  constructor(private translate: TranslateService, private router: Router) {}

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.language, language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
