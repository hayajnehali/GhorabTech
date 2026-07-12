import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'page-header',
  standalone: true,
  template: `
    <div class="header-container">
      <div>
        <h1 class="header-title">
          @if (icon()) {
            <span class="material-icons">{{ icon() }}</span>
          }
          {{ title() }}
        </h1>
        <p class="header-label" translate>{{ label() }}</p>
      </div>
      <div class="header-actions">
        <ng-content select="header-actions"></ng-content>
      </div>
    </div>
  `,
  styles: `
    @use 'variable' as *;

    @use 'sass:color';
    /* Container styling */
    .header-container {
      border-bottom: 1px solid #f3f4f6; /* border-b border-gray-100 */
      display: flex;
      flex-direction: column;
      gap: 1rem; /* gap-4 */
    }

    /* Responsive adjustments for the container */
    @media (min-width: 768px) {
      .header-container {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
    }

    /* Typography & Titles */
    .header-title {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      margin: 0;
      padding-bottom: 0.5rem;

      font-size: 1.5rem;
      font-weight: 700;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;

        width: 100%;
        height: 2px;

        background: linear-gradient(90deg, $accent-gold 0%, transparent 100%);
      }
    }

    .header-label {
      font-size: 0.875rem; /* text-sm */
      color: #6b7280; /* text-gray-500 */
      margin-top: 0.25rem; /* mt-1 */
    }

    /* Action button wrapper */
    .header-actions {
      display: flex;
      gap: 0.75rem; /* gap-3 */
    }
  `,
  imports: [TranslateModule],
})
export class PageHeaderComponent {
  title = input<string>();
  label = input<string>();
  icon = input<string>();
}
