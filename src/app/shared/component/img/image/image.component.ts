import { Component, Input } from '@angular/core'; 
import { TranslateModule } from '@ngx-translate/core';
import { environment } from '../../../environment/environment';

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
  @Input('name') name: string = 'viewImage';
  @Input() width: number = 100; // نسبة مئوية
  @Input() height: number = 100; // نسبة مئوية
  url = environment.assetsUrl;
}
