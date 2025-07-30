// donut-chart.component.ts
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
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donut-chart.component.html',
  styleUrl: './donut-chart.component.scss'
})
export class DonutChartComponent implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  @Input() chartData: ChartData[] = [];

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
