import { Directionality } from '@angular/cdk/bidi';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Component, inject, DOCUMENT } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@shared/environment/environment';
import { AuthService } from '@shared/services/auth.service';

export class BaseLayOutComponent {
  protected observer = inject(BreakpointObserver);
  protected translate = inject(TranslateService);
  protected authService = inject(AuthService);
  protected dir = inject(Directionality);
  protected router = inject(Router);
  protected activatedRoute = inject(ActivatedRoute);
  isAuthenticated: boolean = false;
  links: SocialLink[] = SOCIAL_LINKS;
  language = environment.language_KEY;
  currentLang: string | null = localStorage.getItem(this.language);
  
  constructor() {

  //  this.dir.change.emit(this.currentLang === 'en' ? 'ltr' : 'rtl'); 
  }
}
