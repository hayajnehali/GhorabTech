import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  standalone: true,
  imports: [TranslateModule],
})
export class FooterComponent {
  constructor(private translate: TranslateService, private router: Router) {}
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
