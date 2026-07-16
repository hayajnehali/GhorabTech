import { Component } from '@angular/core';
import { email, phoneNumber, SOCIAL_LINKS } from '@core/model/social.config';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: false,
})
export class ContactComponent {
  socialLinks = SOCIAL_LINKS;
  phoneNumber = phoneNumber;
  email = email;
}
