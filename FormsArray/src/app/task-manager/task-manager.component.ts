// task-manager.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, TaskFormComponent, TaskListComponent],
  template: `
    <div class="container">
      <h1>Task Manager</h1>
      <app-task-form [taskToEdit]="selectedTaskIndex !== null ? tasks[selectedTaskIndex] : null" (taskAdded)="addTask($event)"></app-task-form>
      <app-task-list [tasks]="tasks" (editTaskEvent)="editTask($event)"></app-task-list>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 20px auto; padding: 20px; }
    h1 { text-align: center; }
  `]
})
export class TaskManagerComponent implements OnInit {
  tasks: any[] = [];
  selectedTaskIndex: number | null = null;

  ngOnInit(): void {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask(task: any): void {
    if (this.selectedTaskIndex !== null) {
      this.tasks[this.selectedTaskIndex] = task;
      this.selectedTaskIndex = null;
    } else {
      this.tasks.push(task);
    }
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  editTask(index: number): void {
    this.selectedTaskIndex = index;
  }
}