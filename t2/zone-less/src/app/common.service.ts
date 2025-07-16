// common.service.ts
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  data = signal<number>(0);

  increment() {
    this.data.set(this.data() + 1);
  }
}
