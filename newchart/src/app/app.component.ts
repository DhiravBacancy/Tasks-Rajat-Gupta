// app.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BulletChart2Component } from './bulletchart2/bulletchart2.component';
import { Donutchart2Component } from './donutchart2/donutchart2.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BulletChart2Component, Donutchart2Component],
  templateUrl: './app.component.html'
})
export class AppComponent {}