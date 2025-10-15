import { Component } from '@angular/core';
declare var $: any; 
@Component({
  selector: 'app-slider-home', 
  templateUrl: './slider-home.component.html',
  styleUrl: './slider-home.component.css'
})
export class SliderHomeComponent {
  ngAfterViewInit(): void {
    $(".hero__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: false,
      nav: true,
      navText: ["<span class='arrow_left'></span>", "<span class='arrow_right'></span>"],
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: false
    });
  }
}
