import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';

interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'pending' | '';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserDetailsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  users: User[] = [
    { id: 1, name: 'Alice Smith', status: 'active' },
    { id: 2, name: 'Bob Johnson', status: 'inactive' },
    { id: 3, name: 'Charlie Brown', status: 'pending' },
    { id: 4, name: 'Diana Price', status: '' },
    { id: 5, name: 'Ethan Hunt', status: 'inactive' }
  ];
}