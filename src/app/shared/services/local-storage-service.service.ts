import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  set<T>(key: string, value: T): void {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (e) {
   //   console.error(`Error saving to localStorage key=${key}`, e);
    }
  }

  get<T>(key: string): T | null {
    try {
      const json = localStorage.getItem(key);
      if (!json) return null;
      return JSON.parse(json) as T;
    } catch (e) {
  //    console.error(`Error reading localStorage key=${key}`, e);
      return null;
    }
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
