// task-list.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatSelectModule, FormsModule],
  // task-list.component.ts
// (Keep the existing imports and logic, update template and styles)

templateUrl: './task-list.component.html',
styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  @Input() tasks: any[] = [];
  @Output() editTaskEvent = new EventEmitter<number>();
  filter: 'all' | 'completed' | 'pending' = 'all';

  get filteredTasks(): any[] {
    if (this.filter === 'all') return this.tasks;
    return this.tasks.filter(task =>
      this.filter === 'completed'
        ? task.subtasks.every((subtask: any) => subtask.isCompleted)
        : task.subtasks.some((subtask: any) => !subtask.isCompleted)
    );
  }

  filterTasks(): void {
    // Triggered by ngModelChange, no additional logic needed
  }

  editTask(index: number): void {
    this.editTaskEvent.emit(index);
  }
}