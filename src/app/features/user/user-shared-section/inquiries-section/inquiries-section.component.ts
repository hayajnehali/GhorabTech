import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-inquiries-section',
  standalone: true,
  imports: [TranslateModule,CommonModule],
  templateUrl: './inquiries-section.component.html',
  styleUrl: './inquiries-section.component.scss'
})
export class InquiriesSectionComponent {
  links: SocialLink[]  = SOCIAL_LINKS;
}
