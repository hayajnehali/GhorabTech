import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { ButtonSize, ButtonType, ButtonVariant, IconPosition, Rounded } from '../types/button.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ui-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
imports: [TranslateModule]
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly rounded = input<Rounded>('md');
  readonly fullWidth = input(false);
  readonly cssClass = input('');
  readonly type = input<ButtonType>('button');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly autoFocus = input(false);
  readonly tabIndex = input(0);
  readonly icon = input<string>();
  readonly iconPosition = input<IconPosition>('start');
  readonly id = input<string>();
  readonly name = input<string>();
  readonly ariaLabel = input<string>();
  readonly tooltip = input<string>();
readonly iconOnly = input<boolean, unknown>(false, { transform: booleanAttribute });
  readonly clicked = output<MouseEvent>();

  readonly isDisabled = computed(() => {
    return this.disabled() || this.loading();
  });

  onClick(event: MouseEvent): void {
    if (this.isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.clicked.emit(event);
  }

  readonly classes = computed(() => [
    'app-button',
    `app-button--${this.variant()}`,
    `app-button--${this.size()}`,
    `app-button--rounded-${this.rounded()}`,
    this.fullWidth() ? 'app-button--full' : '',
    this.loading() ? 'app-button--loading' : '',
    this.cssClass(),
  ]);
}
