import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageComponent } from '../image/image.component';
import { FileUploadService } from '@shared/services/file-upload.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NotificationService } from '@shared/services/notification.service';

@Component({
  selector: 'app-multi-image-upload',
  imports: [TranslateModule, CommonModule, ImageComponent],
  templateUrl: './multi-image-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiImageUploadComponent),
      multi: true,
    },
  ],
})
export class MultiImageUploadComponent implements ControlValueAccessor {
  @Input() images: any[] = []; // صور موجودة مسبقاً
  @Output() imagesChange = new EventEmitter<any[]>(); // رجع الصور للأب
  maxFiles = 4;
  maxFileSize = 3 * 1024 * 1024; // 2MB
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp','image/jpg','image/svg',"image/svg+xml"];
  selectedFiles: File[] = [];
  translateService = inject(TranslateService);
  notificationService = inject(NotificationService);
  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) {}

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

    if (files.length + this.images.length > this.maxFiles) {
      this.notificationService.showWarning(
        this.translateService.instant('upload.maxFiles', {
          count: this.maxFiles,
        })
      );
      return;
    }

    for (const file of files) {
      // تحقق من النوع
      if (!this.allowedTypes.includes(file.type)) {
        this.notificationService.showWarning(
          this.translateService.instant('upload.invalidType', {
            name: file.name,
          })
        );
        return;
      }

      // تحقق من الحجم
      if (file.size > this.maxFileSize) {
        this.notificationService.showWarning(
          this.translateService.instant('upload.maxSize', {
            name: file.name,
            size: 2,
          })
        );
        return;
      }
    }
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
