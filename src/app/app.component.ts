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
    // Set default language
    this.translate.setDefaultLang('en');
  }
}
