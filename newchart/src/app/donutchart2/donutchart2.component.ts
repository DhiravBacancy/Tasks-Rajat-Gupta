import { Component, Input, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import 'highcharts/modules/accessibility';

interface ChartData {
  name: string;
  y: number;
  color: string;
}

interface LegendItem {
  color: string;
  label: string;
}

@Component({
  selector: 'app-donutchart2',
  imports: [CommonModule],
  templateUrl: './donutchart2.component.html',
  styleUrl: './donutchart2.component.scss'
})
export class Donutchart2Component {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() chartData: ChartData[] = [
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

  legendItems: LegendItem[] = [];
  private chart!: Highcharts.Chart;

  ngOnInit(): void {
    if (this.chartData.length) {
      this.setupLegendItems();
      this.createChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private setupLegendItems(): void {
    this.legendItems = this.chartData.map(item => ({
      color: item.color,
      label: `${item.name} ${item.y}%`
    }));
  }

  private createChart(): void {
    if (this.chart) this.chart.destroy();

    this.chart = Highcharts.chart(this.chartContainer.nativeElement, {
      chart: { type: 'pie', backgroundColor: 'transparent' },
      title: { text: undefined },
      tooltip: { pointFormat: '<b>{point.percentage:.1f}%</b>' },
      plotOptions: {
        pie: {
          innerSize: '60%',
          dataLabels: { enabled: false },
          showInLegend: false
        }
      },
      series: [{
        type: 'pie',
        data: this.chartData
      }],
      credits: { enabled: false }
    });
  }
}
