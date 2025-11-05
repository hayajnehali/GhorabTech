import { Component } from '@angular/core';
import { BaseComponent } from '@core/base/base-component';
import { environment } from '@shared/environment/environment';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-language-button',
  imports: [MatIcon],
  templateUrl: './language-button.component.html',
  styleUrl: './language-button.component.scss',
})
export class LanguageButtonComponent extends BaseComponent {
  language = environment.language_KEY;
  currentLang: string | null = localStorage.getItem(this.language);
  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.language, language);
    this.router.navigate([this.router.url]).then(() => {
      window.location.reload();
    });
  }
}
