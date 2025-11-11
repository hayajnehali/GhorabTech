import { Component } from '@angular/core';
import { SliderItem, SliderService } from '@shared/services/slider.service';

@Component({
  selector: 'app-slider',
  standalone: false,
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent {
// sliders: SliderItem[] = [];
//   editingSlide: SliderItem | null = null;

//   newSlider: SliderItem = {
//     id: 0,
//     title: '',
//     subtitle: '',
//     description: '',
//     imageUrl: ''
//   };

//   constructor(private sliderService: SliderService) {
//     this.loadSliders();
//   }

//   loadSliders() {
//     this.sliders = this.sliderService.getAll();
//   }

//   addSlider() {
//     if (!this.newSlider.title || !this.newSlider.imageUrl) return;
//     this.newSlider.id = Date.now();
//     this.sliderService.addSlider(this.newSlider);
//     this.newSlider = { id: 0, title: '', subtitle: '', description: '', imageUrl: '' };
//     this.loadSliders();
//   }

//   deleteSlider(id: number) {
//     this.sliderService.deleteSlider(id);
//     this.loadSliders();
//   }

//   startEdit(slider: SliderItem) {
//     this.editingSlide = { ...slider };
//   }

//   saveEdit() {
//     if (this.editingSlide) {
//       this.sliderService.updateSlider(this.editingSlide.id, this.editingSlide);
//       this.editingSlide = null;
//       this.loadSliders();
//     }
//   }

//   cancelEdit() {
//     this.editingSlide = null;
//   }
}
