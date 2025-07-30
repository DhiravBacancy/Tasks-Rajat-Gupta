import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './timing.component.html',
  styleUrl: './timing.component.scss'
})
export class TimingComponent {
  isCollapsed = signal(false);
  prepTime = signal(0); // Time in minutes
  cookTime = signal(0); // Time in minutes

  // Compute total time and format as days, hours, minutes
  totalTime = computed(() => {
    const totalMinutes = this.prepTime() + this.cookTime();
    const days = Math.floor(totalMinutes / (24 * 60));
    const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
    const minutes = totalMinutes % 60;

    return {
      days,
      hours,
      minutes,
      formatted: this.formatTime(days, hours, minutes)
    };
  });

  // Helper to format time as a string
  private formatTime(days: number, hours: number, minutes: number): string {
    const parts: string[] = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    return parts.length > 0 ? parts.join(', ') : '0 minutes';
  }

  // Combined increment/decrement for prep time
  adjustPrepTime(delta: number) {
    this.prepTime.update(time => Math.max(0, Math.min(time + delta, 9999)));
  }

  // Combined increment/decrement for cook time
  adjustCookTime(delta: number) {
    this.cookTime.update(time => Math.max(0, Math.min(time + delta, 9999)));
  }

  // Handle input for prep time
  onPrepTimeInput(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value) || 0;
    this.prepTime.set(Math.max(0, Math.min(value, 9999)));
  }

  // Handle input for cook time
  onCookTimeInput(event: Event) {
    const value = parseInt((event.target as HTMLInputElement).value) || 0;
    this.cookTime.set(Math.max(0, Math.min(value, 9999)));
  }
}