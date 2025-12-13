// spinner.service.ts
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  isOpen = signal(false);

  private _isLoading = new BehaviorSubject<boolean>(false);

  // observable يمكن استخدامه مع async pipe
  isLoading$ = this._isLoading.asObservable();

  show() {
    this._isLoading.next(true);
  }

  hide() {
    this._isLoading.next(false);
  }

  toggleSideCart() {
    this.isOpen.update((v) => !v);
  }

  openSideCart() {
    this.isOpen.set(true);
  }

  closeSideCart() {
    this.isOpen.set(false);
  }
}
