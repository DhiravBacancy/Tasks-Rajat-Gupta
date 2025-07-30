import { Component } from '@angular/core';
import { HighchartsChartComponent } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'b',
  standalone: true,
  imports: [HighchartsChartComponent],
  templateUrl: './bullet-chart-2.component.html',
  // styles: [`.chart { width: 400px; height: 400px; }`]
})
export class b {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;

  chartOptions: Highcharts.Options = {
    chart: {
      inverted: true,
      marginLeft: 135,
      type: 'bullet',
    },
    title: {
      text: 'Bullet Chart Example',
    },
    xAxis: {
      categories: ['Revenue'],
    },
    yAxis: {
      gridLineWidth: 0,
      plotBands: [
        { from: 0, to: 150, color: '#666' },
        { from: 150, to: 225, color: '#999' },
        { from: 225, to: 300, color: '#bbb' },
      ],
      title: { text: undefined },
    },
    series: [
      {
        type: 'bullet',
        data: [
          {
            y: 275, // actual value
            target: 250, // target
          },
        ],
        targetOptions: {
          width: '200%',
        },
      },
    ],
    tooltip: {
      pointFormat: '<b>{point.y}</b> (target: {point.target})',
    },
  };
}
