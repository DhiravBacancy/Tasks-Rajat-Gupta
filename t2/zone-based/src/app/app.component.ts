import { Component } from '@angular/core';
import { CommonService } from './common.service';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  template: `
    <div class=" flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Zone-based Counter</h1>
        <div class="text-center mb-6">
          <span class="text-4xl font-semibold text-gray-800">{{ counter }}</span>
        </div>
        <div class="flex justify-center gap-4">
          <button (click)="increment()" class="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-200">
            Increment
          </button>
          <button (click)="startAsync()" class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition duration-200">
            Start Async
          </button>
        </div>
      </div>
    </div>
    <app-child [test2]="counter"/>
  `,
  imports: [ChildComponent]
})
export class AppComponent {
  counter = 0;

  constructor(private service: CommonService) {
    this.service.data.subscribe(value => this.counter = value);
  }

  increment() {
    // this.service.increment();
    this.counter++;
  }

  startAsync() {
    setInterval(() => this.service.increment(), 1000);
  }
}