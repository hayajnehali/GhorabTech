import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http'; 
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-multi-image-upload',
  standalone: true,
  imports: [CommonModule, ImageComponent],
  templateUrl: './multi-image-upload.component.html',
  styleUrls: ['./multi-image-upload.component.scss'],
})
export class MultiImageUploadComponent {
  @Input() images: any[] = []; // صور موجودة مسبقاً
  @Output() imagesChange = new EventEmitter<any[]>(); // رجع الصور للأب

  selectedFiles: File[] = [];

  constructor(private http: HttpClient) {}

  onFilesSelected(event: any) {
    const files = event.target.files;
    this.selectedFiles = Array.from(files);

    const formData = new FormData();
    this.selectedFiles.forEach((file) => {
      formData.append('files', file, file.name);
    });

    // 🔹 غير الرابط حسب API عندك
    this.http.post<any[]>('https://localhost:5001/api/upload', formData).subscribe({
      next: (res) => {
        this.images = [...this.images, ...res]; // أضف الصور الجديدة
        this.imagesChange.emit(this.images); // رجع الصور للأب
      },
      error: (err) => console.error('File upload failed:', err),
    });
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
    this.imagesChange.emit(this.images); // رجع بعد الحذف
  }
}
