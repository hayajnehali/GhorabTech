import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 
import { ImageComponent } from '../image/image.component';
import { FileUploadService } from '@shared/services/file-upload.service';
import { TranslateModule } from '@ngx-translate/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-multi-image-upload',
  standalone: true,
  imports: [TranslateModule,CommonModule, ImageComponent],
  templateUrl: './multi-image-upload.component.html',
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiImageUploadComponent),
      multi: true,
    }
  ]
})
export class MultiImageUploadComponent implements ControlValueAccessor {
  @Input() images: any[] = []; // صور موجودة مسبقاً
  @Output() imagesChange = new EventEmitter<any[]>(); // رجع الصور للأب

  selectedFiles: File[] = [];

  constructor(private http: HttpClient,private fileUploadService:FileUploadService) {}



  
  private onChange: (images: any[]) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(images: any[]): void {
    this.images = images || [];
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  updateImages(images: any[]) {
    this.images = images;
    this.onChange(this.images);
    this.onTouched();
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.onChange(this.images);
  }
 
onFilesSelected(event: any) {
  const files = event.target.files;
  this.selectedFiles = Array.from(files);

  const formData = new FormData();
  this.selectedFiles.forEach((file) => {
    formData.append('files', file, file.name);
  });

  this.fileUploadService.uploadFile(formData).subscribe({
    next: (res) => {
      this.images = [...this.images, ...res]; // أضف الصور الجديدة
      
      // حدث الـ ngModel
      this.onChange(this.images); 
      this.onTouched();

      // حدث الإخراج العادي
      this.imagesChange.emit(this.images);
    },
    error: (err) => console.error('File upload failed:', err),
  });
}

 
}
