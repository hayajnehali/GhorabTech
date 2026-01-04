import { Component, DOCUMENT, inject } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { Slider, SliderFilter, sliderResult } from '@models/slider';
import { environment } from '@shared/environment/environment';
import { SliderService } from '@shared/services/slider.service';

@Component({
  selector: 'app-slider-list',
  standalone: false,
  templateUrl: './slider-list.component.html',
  styleUrl: './slider-list.component.scss',
})
export class SliderListComponent extends BaseListComponent<
  Slider,
  sliderResult,
  SliderFilter
> {
  flipImage = localStorage.getItem(environment.language_KEY) === 'ar' ? true : false;
  assetsUrl = environment.assetsUrl;
  links: SocialLink[] = SOCIAL_LINKS;
  constructor(private sliderService: SliderService) {
    super(sliderService, SliderFilter);
  }

  override processAfterComplete() {}
  override ngAfterViewInit(): void {}
}
