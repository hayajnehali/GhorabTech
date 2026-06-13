import { Component, computed, input, model } from '@angular/core';
export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'ui-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  host: {
    '[class.is-open]': 'isOpen()',
    '[attr.aria-hidden]': '!isOpen()',
    'aria-modal': 'true',
    role: 'dialog',
  },
})
export class ModalComponent {
  // Two-way bound signal for visibility
  isOpen = model.required<boolean>();

  // Configuration Inputs
  size = input<ModalSize>('md'); // Defaults to medium
  showCloseButton = input<boolean>(true);

  // Computes the correct Bootstrap structural class depending on chosen size
  protected sizeClass = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'modal-sm';
      case 'lg':
        return 'modal-lg';
      case 'xl':
        return 'modal-xl';
      default:
        return ''; // Standard medium size
    }
  });

  close() {
    this.isOpen.set(false);
  }
}
