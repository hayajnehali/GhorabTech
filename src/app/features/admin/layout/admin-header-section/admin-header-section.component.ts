import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-admin-header-section',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './admin-header-section.component.html',
  styleUrl: './admin-header-section.component.scss',
})
export class AdminHeaderSectionComponent {
  currentLang: string | null = localStorage.getItem('language');
  constructor(private translate: TranslateService, private router: Router) {}

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
