import { Component } from '@angular/core';
import { BulletChartComponent } from './bullet-chart/bullet-chart.component';
import { DonutChartComponent} from './donut-chart/donut-chart.component'
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { b } from './bullet-chart-2/bullet-chart-2.component';

interface ChartData {
  name: string;
  y: number;
  color: string;
}

export interface BulletChartData {
  actualValue: number;
  targetValue: number;
  maxValue: number;
  ranges: {
    value: number;
    color: string;
  }[];
  title?: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BulletChartComponent, DonutChartComponent, CommonModule, b],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  donutData: any[] = [];

  bulletData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<ChartData[]>('https://jsonplaceholder.typicode.com/todos/1').subscribe( r => {
      console.log(r);
      this.donutData= [
        {
          name: 'Farmstead Chicken Breast Diced [4 x 1kg]',
          y: 61.1,
          color: '#4285f4'
        },
        {
          name: 'Peppers Red [Each]',
          y: 13.9,
          color: '#7bb3ff'
        },
        {
          name: 'Chopped Tomatoes 400g',
          y: 12.5,
          color: '#8e44ad'
        },
        {
          name: 'Celery Sticks 300g',
          y: 12.5,
          color: '#b19cd9'
        }
      ];
    });
    this.http.get<BulletChartData>('https://jsonplaceholder.typicode.com/todos/1').subscribe( r => {
      this.bulletData = {
        actualValue: 11,
        targetValue: 10,
        maxValue: 20,
        ranges: [
          { value: 20, color: '#fecaca'},
          { value: 15, color: '#fed7aa'},
          { value: 10, color: '#bbf7d0'}
        ]
      };
    });
  }
}