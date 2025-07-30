import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allergen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allergen.component.html',
  styleUrls: ['./allergen.component.scss']
})
export class AllergenComponent {
  @ViewChild('collapseAllergensTab') collapseAllergensTab!: ElementRef;

  allergens = [
    { id: 1, name: 'Celery', type: 'default', clicked: false },
    { id: 2, name: 'Crustaceans', type: 'default', clicked: false },
    { id: 3, name: 'Egg', type: 'default', clicked: false },
    { id: 4, name: 'Fish', type: 'default', clicked: false },
    { id: 5, name: 'Gluten', type: 'default', clicked: false },
    { id: 6, name: 'Lupin', type: 'default', clicked: false },
    { id: 7, name: 'Milk', type: 'default', clicked: false },
    { id: 8, name: 'Molluscs', type: 'default', clicked: false },
    { id: 9, name: 'Mustard', type: 'default', clicked: false },
    { id: 10, name: 'Peanuts', type: 'default', clicked: false },
    { id: 11, name: 'Sesame', type: 'default', clicked: false },
    { id: 12, name: 'So2', type: 'default', clicked: false },
    { id: 13, name: 'Soyabeans', type: 'default', clicked: false },
    { id: 14, name: 'Tree nuts', type: 'default', clicked: false }
  ];

  clickedAllergen(allergen: any) {
    this.allergens.forEach((item) => {
      item.clicked = item.id === allergen.id ? !item.clicked : false;
    });
  }

  onAllergensContains(allergenClass: string, allergen: any) {
    this.allergens[allergen.id - 1].type = allergenClass;
    this.allergens[allergen.id - 1].clicked = false;
  }
}