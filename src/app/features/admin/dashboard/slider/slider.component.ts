import { Component } from '@angular/core';
import { BaseManageComponent } from '@core/base/base-manage-component';
import { Slider, SliderFilter, sliderResult } from '@models/slider';
import { SliderService } from '@shared/services/slider.service';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent extends BaseManageComponent<
  Slider,
  sliderResult,
  SliderFilter
> {
  imageError: boolean = false;
  constructor(private sliderService: SliderService) {
    super(sliderService, Slider);
  }

  override processData() {
    if (this.entity.images.length > 1) {
      this.imageError = true;
      return  
    } else {
      this.imageError = false; 
    }
  }
}
