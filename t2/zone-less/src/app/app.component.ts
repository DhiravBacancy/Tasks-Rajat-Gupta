import { Component, signal } from '@angular/core';
import { CommonService } from './common.service';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-root',
  template: `
    <div class=" flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 class="text-2xl font-bold text-center text-blue-600 mb-6">Zoneless Counter (Signals)</h1>
        <div class="text-center mb-6">
          <span class="text-4xl font-semibold text-gray-800">{{ service.data() }}</span>
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

    <app-child [test]="appSingal"/>
  `,
  imports: [ChildComponent],
})
export class AppComponent {
  constructor(public service: CommonService) {}

  appSingal = signal<number>(1);

  increment() {
    // this.service.increment();
    this.appSingal.update(value => value + 1);
  }

  startAsync() {
    setInterval(() => {
      this.service.increment();
    }, 1000);
  }
}
function singal(arg0: number) {
  throw new Error('Function not implemented.');
}

