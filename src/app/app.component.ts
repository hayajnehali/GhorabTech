import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core'; 
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@shared/environment/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: false
})
export class AppComponent {
  title = 'angularProject';
  language = environment.language_KEY;
  protected document = inject(DOCUMENT);
  constructor(
    private translate: TranslateService
  ) {
    const storedLanguage = localStorage.getItem(this.language);
    if (storedLanguage) {
      this.translate.setDefaultLang(storedLanguage);
      this.translate.use(storedLanguage); 
    } else {
      this.translate.setDefaultLang('ar');  
      this.translate.use('ar');  
    }
    this.document.documentElement.setAttribute(
      'dir',
      storedLanguage === 'en' ? 'ltr' : 'rtl'
    );
  }

  // Method to change language
  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.language, language); // Save preference in local storage
  }
}
