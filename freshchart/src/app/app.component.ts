  // app.component.ts
  import { Component, AfterViewInit } from '@angular/core';
  import { CommonModule } from '@angular/common';

  declare var Highcharts: any;

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
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
    template: `<div id="container"></div>`,
    styles: [` 
      #container {
        height: 120px;
        margin: 20px 0;
      }
    `]
  })
  export class AppComponent implements AfterViewInit {
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

    ngAfterViewInit() {
      this.initializeChart();
    }

    private initializeChart() {
      // Set global options for bullet chart
      Highcharts.setOptions({
        chart: {
          inverted: true,
          marginLeft: 80,
          type: 'bullet'
        },
        legend: {
          enabled: false
        },
        yAxis: {
          gridLineWidth: 0
        },
        plotOptions: {
          series: {
            pointPadding: 0.25,
            borderWidth: 0,
            targetOptions: {
              width: '200%',
              borderWidth: this.targetLineWidth,
              color: this.targetLineColor,  // Fill color
              borderColor: this.targetLineColor // Stroke color
            }
          }
        },
        credits: {
          enabled: false
        },
        exporting: {
          enabled: false
        }
      });

      // Create plot bands from ranges
      const plotBands = this.bulletData.ranges
        .sort((a, b) => a.value - b.value)
        .map((range, index, sortedRanges) => ({
          from: index === 0 ? 0 : sortedRanges[index - 1].value,
          to: range.value,
          color: range.color
        }));

      // Create the bullet chart
      Highcharts.chart('container', {
        chart: {
          marginTop: 30,
          marginBottom: 50,
          height: 140,
          backgroundColor: 'transparent'
        },
        xAxis: {
          visible: false,
  
        },
        yAxis: {
          min: 0,
          max: this.bulletData.maxValue,
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
          title: null
        },
        series: [{
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