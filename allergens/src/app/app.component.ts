import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AllergenComponent } from './allergen/allergen.component';

@Component({
  selector: 'app-root',
  imports: [ AllergenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'allergens';
}
