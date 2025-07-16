import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  data = new BehaviorSubject<number>(0);

  increment() {
    this.data.next(this.data.value + 1);
  }
}