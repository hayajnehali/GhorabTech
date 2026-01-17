import { Component } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-no-data',
  imports: [MatIcon,TranslateModule],
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss',
  standalone: true
})
export class NoDataComponent {

}
