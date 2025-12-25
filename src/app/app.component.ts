import {
  Component,
  inject,
  DOCUMENT,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@shared/environment/environment';
import { SpinnerService } from '@shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false, 
})
export class AppComponent {
  title = 'angularProject';
  language = environment.language_KEY;
  protected document = inject(DOCUMENT);
  spinnerService = inject(SpinnerService);
  constructor(
    private translate: TranslateService, 
  ) {}
  ngOnInit() {
    const storedLanguage = localStorage.getItem(this.language);
    if (storedLanguage) {
      this.translate.setDefaultLang(storedLanguage);
      this.translate.use(storedLanguage);
    } else {
      this.translate.setDefaultLang('ar');
      this.translate.use('ar');
    }
  }
  ngAfterViewInit(): void {
    const storedLanguage = localStorage.getItem(this.language);
    this.document.documentElement.setAttribute(
      'dir',
      storedLanguage === 'en' ? 'ltr' : 'rtl'
    ); 
  } 
  changeLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem(this.language, language); // Save preference in local storage
  }
}
