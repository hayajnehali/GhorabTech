import { Injectable } from '@angular/core'; 
@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private sliders: SliderItem[] = [
    {
      id: 1,
      title: 'تشكيلة حصرية من الساعات والعطور والزهور',
      subtitle: 'هدية مثالية لك',
      description: 'اكتشف مجموعتنا المختارة بعناية من العطور الفاخرة...',
      imageUrl: 'assets/img/hero/380a0558-d7d3-4fbf-bc0d-1f987fb6fdb3.png'
    },
    {
      id: 2,
      title: 'أفضل الهدايا لمناسباتك الخاصة',
      subtitle: 'جمال وأناقة في كل تفصيل',
      description: 'اجعل لحظاتك مميزة مع منتجاتنا الحصرية.',
      imageUrl: 'assets/img/hero/pexels-zvolskiy-1805597.jpg'
    }
  ];

  getAll() {
    return this.sliders;
  }

  updateSlider(id: number, data: Partial<SliderItem>) {
    const i = this.sliders.findIndex(s => s.id === id);
    if (i !== -1) {
      this.sliders[i] = { ...this.sliders[i], ...data };
    }
  }

  addSlider(slider: SliderItem) {
    this.sliders.push(slider);
  }

  deleteSlider(id: number) {
    this.sliders = this.sliders.filter(s => s.id !== id);
  }
}

export interface SliderItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}
