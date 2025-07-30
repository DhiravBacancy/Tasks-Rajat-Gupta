import { Component } from '@angular/core';
import { TimingComponent } from './timing/timing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TimingComponent],
  template: `
    <div class="min-vh-100 bg-light">
      <div class="container py-5">
        <div class="row justify-content-center">
          <div class="col-12 col-xl-10">
            <div class="card border-0 shadow-sm">
              <div class="card-body p-0">
                <app-timing></app-timing>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'timing-app';
}