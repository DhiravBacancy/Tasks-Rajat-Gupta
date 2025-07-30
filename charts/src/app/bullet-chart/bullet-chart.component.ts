import { Component, Input, OnDestroy, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';

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
  selector: 'app-bullet-chart',
  standalone: true,
  imports: [CommonModule],
  template: `<div #chartContainer></div>`,
  styleUrls: ['./bullet-chart.component.scss']
})
export class BulletChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;
  @Input() data!: BulletChartData;

  actualBarColor = '#7b2d8e';
  targetLineColor = '#000000';
  targetLineWidth = 3;
  showTooltip = false;

  private chart!: Highcharts.Chart;

  ngAfterViewInit() {
    if (this.data) this.createBulletChart();
  }

  ngOnDestroy() {
    this.chart.destroy();
  }

private createBulletChart() {
  if (this.chart) this.chart.destroy();

  const rangeSeries: Highcharts.SeriesBarOptions[] = this.data.ranges
    .sort((a, b) => b.value - a.value)
    .map(range => ({
      type: 'bar',
      name: '',
      data: [range.value],
      color: range.color,
      pointWidth: 60,
      zIndex: 1
    }));

  const actualSeries: Highcharts.SeriesBarOptions = {
    type: 'bar',
    name: 'Actual',
    data: [this.data.actualValue] as any,
    color: this.actualBarColor,
    pointWidth: 24,
    zIndex: 3
  };

  const targetLineSeries: Highcharts.SeriesLineOptions = {
    type: 'line',
    name: 'Target Line',
    data: [
      { x: -0.48, y: this.data.targetValue },
      { x: 0.48, y: this.data.targetValue }
    ],
    color: this.targetLineColor,
    lineWidth: this.targetLineWidth,
    marker: { enabled: false },
    enableMouseTracking: false,
    showInLegend: false,
    zIndex: 5
  };

  const options: Highcharts.Options = {
    chart: {
      type: 'bar',
      height: 120,
      backgroundColor: 'transparent',
      margin: [10, 10, 30, 50],
      animation: false
    },
    title: {
      text: this.data.title || '',
      align: 'center',
      verticalAlign: 'bottom',
      y: 20 // Adjust this if needed to push the title lower
    },
    xAxis: { categories: [''], visible: false },
    yAxis: {
      min: 0,
      max: this.data.maxValue,
      title: { text: undefined },
      labels: { format: '{value}%', style: { fontSize: '10px' } },
      gridLineWidth: 0,
      tickPositions: [0, 5, 10, 15, 20, 25]
      // Removed plotLines to avoid full-width target line
    },
    tooltip: {
      enabled: this.showTooltip,
      pointFormat: '<b>{point.y}</b> (target: ' + this.data.targetValue + ')'
    },
    legend: { enabled: false },
    plotOptions: {
      bar: {
        grouping: false,
        borderWidth: 0,
        dataLabels: { enabled: false },
        animation: false
      }
    },
    series: [...rangeSeries, actualSeries, targetLineSeries],
    credits: { enabled: false }
  };

  this.chart = Highcharts.chart(this.chartContainer.nativeElement, options);
}

}
