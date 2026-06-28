import { Component, forwardRef, input, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxMaterialTimepickerModule,
  TimepickerDirective, 
} from 'ngx-material-timepicker';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, NgxMaterialTimepickerModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    },
  ],
  templateUrl: './time-picker.component.html',
  styleUrl: './time-picker.component.scss',
})
export class TimePickerComponent implements ControlValueAccessor { 
  
  readonly placeholder = input<string>('12:00 PM');
  readonly min = input<string>('');
  readonly max = input<string>('');

  readonly timeValue = signal<string>('');
  readonly isDisabled = signal<boolean>(false);

  private readonly timepickerDirective = viewChild('timeInput', { read: TimepickerDirective });

 

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: any): void {
    this.timeValue.set(this.normalizeTo24h(value));
    const display = this.convert24to12(this.timeValue());
    this.timepickerDirective()?.writeValue(display);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  onTimeSet(time: string): void {
    const hhmm = this.convert12to24(time);
    this.timeValue.set(hhmm);
    this.onChange(hhmm);
    this.onTouched();
  }

  private normalizeTo24h(value: any): string {
    if (!value) return '';

    if (value instanceof Date) {
      const h = String(value.getHours()).padStart(2, '0');
      const m = String(value.getMinutes()).padStart(2, '0');
      return `${h}:${m}`;
    }

    const str = String(value);

    if (/^([01]\d|2[0-3]):[0-5]\d$/.test(str)) {
      return str;
    }

    return this.convert12to24(str);
  }

  private convert12to24(time12: string): string {
  
    if (!time12) return '';
    const match = time12.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return time12;

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = match[3].toUpperCase();

    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  private convert24to12(time24: string): string {
    if (!time24) return '';
    const match = time24.match(/^(\d{2}):(\d{2})$/);
    if (!match) return time24;

    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const period = hours >= 12 ? 'PM' : 'AM';

    if (hours > 12) hours -= 12;
    if (hours === 0) hours = 12;

    return `${hours}:${minutes} ${period}`;
  }
}
