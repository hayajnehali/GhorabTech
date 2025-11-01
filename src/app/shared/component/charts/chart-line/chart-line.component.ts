import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
 
@Component({
    selector: 'app-chart-line',
    imports: [],
    templateUrl: './chart-line.component.html',
    styleUrl: './chart-line.component.scss'
})
export class ChartLineComponent {
  
salesData = [
    {
      name: 'المبيعات',
      series: [
        { name: 'يناير', value: 5000 },
        { name: 'فبراير', value: 7000 },
        { name: 'مارس', value: 6500 },
        { name: 'أبريل', value: 9000 },
        { name: 'مايو', value: 8500 },
        { name: 'يونيو', value: 11000 },
      ]
    }
  ];

  // إعدادات اختيارية
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'الشهر';
  showYAxisLabel = true;
  yAxisLabel = 'المبيعات (ريال)';
 // colorScheme = { domain: ['#42A5F5'] };
  colorScheme: string = 'vivid';

}
