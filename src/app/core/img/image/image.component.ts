import { Component, Input } from '@angular/core';
import { environment } from '../../../shared/environment/environment';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './image.component.html',
})
export class ImageComponent {
  @Input('src') src?: string;
  @Input('class') class?: string;
  @Input() alt: string = '';
  @Input() width: number = 100; // نسبة مئوية
  @Input() height: number = 100; // نسبة مئوية
  url = environment.assetsUrl;
}
