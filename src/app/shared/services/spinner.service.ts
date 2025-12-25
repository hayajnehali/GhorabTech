import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // استخدام Signals لكل الحالات
  isOpen = signal(false);
  isSideBarOpen = signal(false); 
  
  // تحويل isLoading إلى Signal
  private _isLoading = signal<boolean>(false);
  // تصديرها كـ Readonly لحماية الحالة
  isLoading = this._isLoading.asReadonly();

  show() {
    this._isLoading.set(true);
  }

  hide() {
    // الـ setTimeout هنا هي "السحر" الذي يحل خطأ NG0100
    // لأنها تنقل التغيير إلى الدورة القادمة (Macrotask)
    setTimeout(() => {
      this._isLoading.set(false);
    });
  }

  toggleSideCart() {
    this.isOpen.update((v) => !v);
  }

  toggleSideBar() {
    this.isSideBarOpen.update((v) => !v);
  }

  openSideCart() {
    this.isOpen.set(true);
  }

  closeSideCart() {
    this.isOpen.set(false);
  }
}