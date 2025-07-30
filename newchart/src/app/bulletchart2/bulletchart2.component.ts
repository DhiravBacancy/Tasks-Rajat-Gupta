// bulletchart2.component.ts
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Highcharts from 'highcharts';
import bulletChart from 'highcharts/modules/bullet';
import accessibility from 'highcharts/modules/accessibility';

// Initialize modules
accessibility(Highcharts);
bulletChart(Highcharts);

export interface BulletChartData {
  actualValue: number;
  targetValue: number;
  maxValue: number;
  ranges: {
    value: number;
    color: string;
  }[];
}

@Component({
  selector: 'app-bulletchart2',
  imports: [CommonModule],
  templateUrl: './bulletchart2.component.html',
  styleUrl: './bulletchart2.component.scss'
})
export class BulletChart2Component implements OnInit, OnDestroy {
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  bulletData: BulletChartData = {
    actualValue: 11,
    targetValue: 10,
    maxValue: 20,
    ranges: [
      { value: 20, color: '#fecaca'},
      { value: 15, color: '#fed7aa'},
      { value: 10, color: '#bbf7d0'}
    ]
  };

  actualBarColor = '#7b2d8e';
  targetLineColor = '#000000';
  targetLineWidth = 3;

  private chart!: Highcharts.Chart;

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private createChart(): void {
    if (this.chart) this.chart.destroy();

    // Create plot bands from ranges
    const plotBands = this.bulletData.ranges
      .sort((a, b) => a.value - b.value)
      .map((range, index, sortedRanges) => ({
        from: index === 0 ? 0 : sortedRanges[index - 1].value,
        to: range.value,
        color: range.color
      }));

    this.chart = Highcharts.chart(this.chartContainer.nativeElement, {
      chart: {
        inverted: true,
        marginLeft: 80,
        type: 'bullet',
        marginTop: 30,
        marginBottom: 50,
        height: 140,
        backgroundColor: 'transparent'
      },
      title: {
        text: undefined
      },
      legend: {
        enabled: false
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        min: 0,
        max: this.bulletData.maxValue,
        gridLineWidth: 0,
        plotBands: plotBands,
        labels: {
          format: '{value}%',
          style: {
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#050505ff'
          }
        },
        tickInterval: 5,
        title: undefined
      },
      plotOptions: {
        series: {
          borderWidth: 0
        }
      },
      credits: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        type: 'bullet',
        data: [{
          y: this.bulletData.actualValue,
          target: this.bulletData.targetValue
        }],
        color: this.actualBarColor,
        targetOptions: {
          color: this.targetLineColor
        }
      }],
      tooltip: {
        pointFormat: '<b>{point.y}%</b> (target: {point.target}%)'
      }
    });
  }
}