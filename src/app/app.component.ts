import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularProject';
  constructor(private translate: TranslateService) {
    // Check local storage for language preference
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.translate.setDefaultLang(storedLanguage);
      this.translate.use(storedLanguage); // Set the current language
    } else {
      this.translate.setDefaultLang('ar'); // Fallback to default language
      this.translate.use('ar'); // Load default language
    }
  }

  // Method to change language
  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language); // Save preference in local storage
  }
}
