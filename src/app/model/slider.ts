import { LocalizedString } from '@core/base/localized-string ';
import { FilterBase } from './filter-base';
import { ModelBase } from './base.model';
import { SliderImage } from './Images';

export class Slider extends ModelBase {
  title: LocalizedString = new LocalizedString();
  description: LocalizedString = new LocalizedString();
  // image: SliderImage |undefined= new SliderImage();
  images: SliderImage[] = [];
  constructor() {
    super();
    // Additional initialization can go here
  }
}
export class sliderResult extends ModelBase {
  title: LocalizedString = new LocalizedString();
  description: LocalizedString = new LocalizedString();
  //  image: SliderImage = new SliderImage();
  images: SliderImage[] = [];
  constructor() {
    super();
  }
}

export class SliderFilter extends FilterBase {}
