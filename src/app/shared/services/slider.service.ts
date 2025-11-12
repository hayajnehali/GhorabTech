import { Injectable } from '@angular/core'; 
import { ServiceBase } from './base.service';
import { Slider, SliderFilter, sliderResult } from '@models/slider';
import { HttpClient } from '@angular/common/http';
import { apiName } from '@shared/Enum/api-name';
@Injectable({
  providedIn: 'root'
})
export class SliderService extends ServiceBase<Slider, sliderResult, SliderFilter> { 
  constructor(http: HttpClient) {
    super(http, apiName.slider);
  }
 
 
}
 