import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(input: Date): string {
    let value = input.toString();
    if (!value) return '';
    const match = value.match(/^(\d{2}):(\d{2})$/);
    if (!match) return value;

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${minutes} ${period}`;
  }
}
