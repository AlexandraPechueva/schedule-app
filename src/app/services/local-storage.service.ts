import { Injectable, InjectionToken, Inject } from '@angular/core';

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(BROWSER_STORAGE) private _storage: Storage) { }

  get(key: string): any {
    try {
      return JSON.parse(this._storage.getItem(key));
    }
    catch {
      return null;
    }
  }

  set(key: string, value: any) {
    this._storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }
}




