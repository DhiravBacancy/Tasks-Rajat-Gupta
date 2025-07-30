// task-form.component.ts
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <mat-card class="form-card">
      <mat-card-header>
        <mat-card-title>Add/Edit Task</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <form [formGroup]="taskForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Task Title</mat-label>
            <input matInput formControlName="title" required />
            @if (taskForm.get('title')?.invalid && taskForm.get('title')?.touched) {
              <mat-error>
                Please enter a task title. It must be at least 3 characters long.
              </mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="fill" class="form-field">
            <mat-label>Description</mat-label>
            <textarea matInput formControlName="description" required></textarea>
            @if (taskForm.get('description')?.invalid && taskForm.get('description')?.touched) {
              <mat-error>
                Please provide a description for the task.
              </mat-error>
            }
          </mat-form-field>

          <h3 class="subtasks-title">Subtasks</h3>
          <div formArrayName="subtasks" class="subtasks-container">
            @for (subtask of subtasks.controls; track subtask; let i = $index) {
              <div [formGroupName]="i" class="subtask-row">
                <mat-form-field appearance="fill" class="form-field">
                  <mat-label>Subtask Name</mat-label>
                  <input matInput formControlName="subtaskName" required />
                  @if (subtask.get('subtaskName')?.invalid && subtask.get('subtaskName')?.touched) {
                    <mat-error>
                      A subtask name is required. Please enter a valid name.
                    </mat-error>
                  }
                </mat-form-field>
                <mat-form-field appearance="fill" class="form-field">
                  <mat-label>Deadline (YYYY-MM-DD)</mat-label>
                  <input matInput formControlName="deadline" />
                  @if (subtask.get('deadline')?.invalid && subtask.get('deadline')?.touched) {
                    <mat-error>
                      Please enter a valid deadline in YYYY-MM-DD format (e.g., 2025-07-29).
                    </mat-error>
                  }
                </mat-form-field>
                <mat-checkbox formControlName="isCompleted">Completed</mat-checkbox>
                <button mat-icon-button color="warn" (click)="removeSubtask(i)"><mat-icon>delete</mat-icon></button>
              </div>
            }
          </div>
          <div class="button-row">
            <button mat-stroked-button color="primary" (click)="addSubtask()">Add Subtask</button>
            <button mat-stroked-button color="accent" (click)="markAllSubtasksCompleted()">Mark All Subtasks Completed</button>
            <button mat-raised-button color="primary" type="submit" [disabled]="taskForm.invalid">Save Task</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form-card { max-width: 600px; margin: 20px auto; padding: 16px; }
    .form-field { margin-bottom: 16px; }
    .subtasks-title { margin-top: 16px; margin-bottom: 8px; }
    .subtasks-container { margin-bottom: 16px; }
    .subtask-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; margin-bottom: 16px; }
    .button-row { display: flex; gap: 10px; justify-content: flex-end; margin-top: 16px; }
    mat-form-field { flex: 1; min-width: 150px; }
    mat-icon-button { margin-left: 8px; }
  `]
})
export class TaskFormComponent implements OnChanges {
  @Input() taskToEdit: any = null;
  @Output() taskAdded = new EventEmitter<any>();
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      subtasks: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description
      });
      this.subtasks.clear();
      this.taskToEdit.subtasks.forEach((subtask: any) => {
        const subtaskGroup = this.createSubtask();
        subtaskGroup.patchValue({
          subtaskName: subtask.subtaskName,
          isCompleted: subtask.isCompleted,
          deadline: subtask.deadline
        });
        this.subtasks.push(subtaskGroup);
      });
    }
  }

  get subtasks(): FormArray<FormGroup> {
    return this.taskForm.get('subtasks') as FormArray<FormGroup>;
  }

  createSubtask(): FormGroup {
    return this.fb.group({
      subtaskName: ['', Validators.required],
      isCompleted: [false],
      deadline: ['', [Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]]
    });
  }

  addSubtask(): void {
    this.subtasks.push(this.createSubtask());
  }

  removeSubtask(index: number): void {
    this.subtasks.removeAt(index);
  }

  markAllSubtasksCompleted(): void {
    this.subtasks.controls.forEach((subtask: FormGroup) => {
      subtask.get('isCompleted')?.setValue(true);
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      this.taskAdded.emit(this.taskForm.value);
      this.taskForm.reset();
      this.subtasks.clear();
    }
  }
}