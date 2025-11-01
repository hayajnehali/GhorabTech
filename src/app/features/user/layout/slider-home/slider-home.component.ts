
import { Component, inject, DOCUMENT } from '@angular/core';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
declare var $: any;
@Component({
    selector: 'app-slider-home',
    templateUrl: './slider-home.component.html',
    styleUrl: './slider-home.component.scss',
    standalone: false
})
export class SliderHomeComponent {
  protected document = inject(DOCUMENT); 
  links: SocialLink[] = SOCIAL_LINKS;

  ngAfterViewInit(): void {
    const isRtl = this.document.documentElement.getAttribute('dir') === 'rtl';

    $('.hero__slider').owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      rtl: isRtl,
      navText: [
        "<span class='arrow_left'></span>",
        "<span class='arrow_right'></span>",
      ],
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false,
    });
  }
}
