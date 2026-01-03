
import { Component, inject, DOCUMENT } from '@angular/core';
import { BaseListComponent } from '@core/base/base-ilst-component';
import { SOCIAL_LINKS, SocialLink } from '@core/model/social.config';
import { Slider, SliderFilter, sliderResult } from '@models/slider';
import { environment } from '@shared/environment/environment';
import { SliderService } from '@shared/services/slider.service';
 
@Component({
    selector: 'app-slider-home',
    templateUrl: './slider-home.component.html',
    styleUrl: './slider-home.component.scss',
    standalone: false
})
export class SliderHomeComponent extends BaseListComponent<
  Slider,
  sliderResult,
  SliderFilter
> { 
 
  assetsUrl=environment.assetsUrl
  flipImage=localStorage.getItem(environment.language_KEY)==='ar'?true:false;
  constructor(private sliderService: SliderService) {
    super(sliderService, SliderFilter); 
  }
  protected document = inject(DOCUMENT); 
  links: SocialLink[] = SOCIAL_LINKS;

 
}
