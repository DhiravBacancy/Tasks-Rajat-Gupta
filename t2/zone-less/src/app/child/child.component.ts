import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  @Input() test = signal<number>(1);
  @Input() test2 = 1;
}
