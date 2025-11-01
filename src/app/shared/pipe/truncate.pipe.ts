import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate' // Name used to reference the pipe in the template
    ,
    standalone: false
})
export class TruncatePipe implements PipeTransform {

  // The transform method will limit the string to the specified length
  transform(value: string, limit: number): string {
    if (!value) return '';  // Handle null/undefined input
    return value.length > limit ? value.substring(0, limit) + '...' : value;
  }

}
