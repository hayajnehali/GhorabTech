import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { environment } from '@shared/environment/environment'; 

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [TranslateModule]
})
export class FooterComponent {
  language=environment.language_KEY
  currentLang =localStorage.getItem(this.language) || 'ar';
  constructor(private translate: TranslateService, private router: Router) {}
  switchLanguage(language: string) {
    this.translate.use(language); 
    localStorage.setItem(this.language, language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
