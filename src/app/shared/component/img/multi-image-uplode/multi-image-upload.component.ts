// import {
//   Component,
//   EventEmitter,
//   forwardRef,
//   inject,
//   Input,
//   Output,
// } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { ImageComponent } from '../image/image.component';
// import { FileUploadService } from '@shared/services/file-upload.service';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
// import { NotificationService } from '@shared/services/notification.service';

// @Component({
//   selector: 'app-multi-image-upload',
//   imports: [TranslateModule, CommonModule, ImageComponent],
//   templateUrl: './multi-image-upload.component.html',
//   providers: [
//     {
//       provide: NG_VALUE_ACCESSOR,
//       useExisting: forwardRef(() => MultiImageUploadComponent),
//       multi: true,
//     },
//   ],
// })
// export class MultiImageUploadComponent implements ControlValueAccessor {
//   @Input() images: any[] = []; // صور موجودة مسبقاً
//   @Output() imagesChange = new EventEmitter<any[]>(); // رجع الصور للأب
//   maxFiles = 4;
//   maxFileSize = 3 * 1024 * 1024; // 2MB
//   allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp','image/jpg','image/svg',"image/svg+xml"];
//   selectedFiles: File[] = [];
//   translateService = inject(TranslateService);
//   notificationService = inject(NotificationService);
//   constructor(
//     private http: HttpClient,
//     private fileUploadService: FileUploadService
//   ) {}

//   private onChange: (images: any[]) => void = () => {};
//   private onTouched: () => void = () => {};

//   writeValue(images: any[]): void {
//     this.images = images || [];
//   }

//   registerOnChange(fn: any): void {
//     this.onChange = fn;
//   }

//   registerOnTouched(fn: any): void {
//     this.onTouched = fn;
//   }

//   updateImages(images: any[]) {
//     this.images = images;
//     this.onChange(this.images);
//     this.onTouched();
//   }

//   removeImage(index: number) {
//     this.images.splice(index, 1);
//     this.onChange(this.images);
//   }

//   onFilesSelected(event: any) {
//     const files = event.target.files;

//     if (files.length + this.images.length > this.maxFiles) {
//       this.notificationService.showWarning(
//         this.translateService.instant('upload.maxFiles', {
//           count: this.maxFiles,
//         })
//       );
//       return;
//     }

//     for (const file of files) {
//       // تحقق من النوع
//       if (!this.allowedTypes.includes(file.type)) {
//         this.notificationService.showWarning(
//           this.translateService.instant('upload.invalidType', {
//             name: file.name,
//           })
//         );
//         return;
//       }

//       // تحقق من الحجم
//       if (file.size > this.maxFileSize) {
//         this.notificationService.showWarning(
//           this.translateService.instant('upload.maxSize', {
//             name: file.name,
//             size: 2,
//           })
//         );
//         return;
//       }
//     }
//     this.selectedFiles = Array.from(files);
//     const formData = new FormData();
//     this.selectedFiles.forEach((file) => {
//       formData.append('files', file, file.name);
//     });

//     this.fileUploadService.uploadFile(formData).subscribe({
//       next: (res) => {
//         this.images = [...this.images, ...res]; // أضف الصور الجديدة

//         // حدث الـ ngModel
//         this.onChange(this.images);
//         this.onTouched();

//         // حدث الإخراج العادي
//         this.imagesChange.emit(this.images);
//       },
//       error: (err) => console.error('File upload failed:', err),
//     });
//   }
// }

import {
  Component,
  EventEmitter,
  forwardRef,
  inject,
  Input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ImageComponent } from '../image/image.component';
import { FileUploadService } from '@shared/services/file-upload.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NotificationService } from '@shared/services/notification.service';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-multi-image-upload',
  standalone: true,
  imports: [TranslateModule, CommonModule, ImageComponent, ImageCropperComponent],
  templateUrl: './multi-image-upload.component.html',
  styleUrls: ['./multi-image-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiImageUploadComponent),
      multi: true,
    },
  ],
})
export class MultiImageUploadComponent implements ControlValueAccessor {
  @Input() images: any[] = [];
  @Output() imagesChange = new EventEmitter<any[]>();
  @Input() aspectRatio: number = 1 / 1;

  maxFiles = 4;
  maxFileSize = 3 * 1024 * 1024;
  allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/jpg', 'image/svg', 'image/svg+xml'];

  // متغيرات لإدارة عملية القص
  filesToProcess: File[] = [];
  currentImageEvent = signal<any>(null);
  finalBlobs: Blob[] = [];
  currentTempBlob: Blob | null | undefined= null;

  translateService = inject(TranslateService);
  notificationService = inject(NotificationService);
  fileUploadService = inject(FileUploadService);

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

  onFilesSelected(event: any) {
    const files = Array.from(event.target.files as FileList);

    if (files.length + this.images.length > this.maxFiles) {
      this.notificationService.showWarning(this.translateService.instant('upload.maxFiles', { count: this.maxFiles }));
      return;
    }

    // فلترة الملفات حسب الشروط
    this.filesToProcess = files.filter(file => {
      if (!this.allowedTypes.includes(file.type)) {
        this.notificationService.showWarning(this.translateService.instant('upload.invalidType', { name: file.name }));
        return false;
      }
      if (file.size > this.maxFileSize) {
        this.notificationService.showWarning(this.translateService.instant('upload.maxSize', { name: file.name, size: 3 }));
        return false;
      }
      return true;
    });

    if (this.filesToProcess.length > 0) {
      this.startNextCrop();
    }
  }

  startNextCrop() {
    if (this.filesToProcess.length > 0) {
      const file = this.filesToProcess.shift();
      // محاكاة حدث اختيار ملف للـ cropper
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file!);
      this.currentImageEvent.set({ target: { files: dataTransfer.files } });
    } else {
      this.uploadAllProcessedImages();
    }
  }

  onImageCropped(event: ImageCroppedEvent) {
    this.currentTempBlob = event.blob;
  }

  confirmCrop() {
    if (this.currentTempBlob) {
      this.finalBlobs.push(this.currentTempBlob);
      this.currentTempBlob = null;
      this.currentImageEvent.set(null);
      this.startNextCrop(); // انتقل للصورة التالية
    }
  }

  cancelAll() {
    this.filesToProcess = [];
    this.finalBlobs = [];
    this.currentImageEvent.set(null);
  }

  uploadAllProcessedImages() {
    if (this.finalBlobs.length === 0) return;

    const formData = new FormData();
    this.finalBlobs.forEach((blob, index) => {
      formData.append('files', blob, `image_${Date.now()}_${index}.png`);
    });

    this.fileUploadService.uploadFile(formData).subscribe({
      next: (res) => {
        this.images = [...this.images, ...res];
        this.onChange(this.images);
        this.onTouched();
        this.imagesChange.emit(this.images);
        this.finalBlobs = []; // تصفير المصفوفة
      },
        error: (err) => console.error('File upload failed:', err),
    });
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.onChange(this.images);
    this.imagesChange.emit(this.images);
  }
}