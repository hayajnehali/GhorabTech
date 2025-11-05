import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateModule } from '@ngx-translate/core'; 

@Component({
  selector: 'app-top-bar',
  imports: [TranslateModule,CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  links: SocialLink[]  = SOCIAL_LINKS;
}
