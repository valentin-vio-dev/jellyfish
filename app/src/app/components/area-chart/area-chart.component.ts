import { Component, OnInit, ViewChild, Input, OnDestroy, Output, OnChanges, EventEmitter } from '@angular/core';

import { Chart } from 'chart.js';
import { RecordService } from 'src/app/services/record.service';
import { Colors } from 'src/app/utils/colors';
import { CloudService } from 'src/app/services/cloud.service';
import { Subscription, Observable } from 'rxjs';
import { Record } from 'src/models/Record';

import * as Hammer from 'hammerjs';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
})
export class AreaChartComponent implements OnInit, OnChanges {
  @Input() times: {lower: number, upper: number};
  @Input() chartType: string;

  @Output() emitPan = new EventEmitter();

  signalsChart: Chart;
  @ViewChild('areaChart', {static: true}) areaChart;

  constructor(private recordService: RecordService, private cloudService: CloudService) { }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.setupChartValues(this.times);
    if(changes.chartType) {
      this.constructSignalsChart();
      console.log(changes.chartType.currentValue);
      this.setupChartValues(this.times);
    }
  }

  ngOnInit() {
    this.constructSignalsChart();
    this.setupChartValues({lower: 0, upper: 10});
  }

  setupChartValues(values) {
    if(!this.signalsChart) {
      return;
    }

    for(let i=0;i<14;i++) {
      this.signalsChart.data.datasets[i].data = Record.getSignalsByChannel(i, this.cloudService.currentCloudRecord.getRangeSignals(values.lower, values.upper));
    }
    this.signalsChart.data.labels = this.getXaxisLabels(Math.abs(values.upper - values.lower) - 1);
    this.signalsChart.update();
  }
  
  getChartOptions() {
    return {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: false
      },
      elements: {
        point:{
          radius: 0
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
              display: false
          }
        }],
        xAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
              display: false
          }
        }]
      }
    };
  }

  constructSignalsChart() {
    this.signalsChart = new Chart(this.areaChart.nativeElement, {
      type: 'line',
      options: this.getChartOptions(),
      data: {
        labels: this.getXaxisLabels(10),
        datasets: [
          {
            label: 'AF3',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx1.fill : 'transparent',
            borderColor: Colors.colx1.border,
            data: []
          },
          {
            label: 'F7',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx2.fill : 'transparent',
            borderColor: Colors.colx2.border,
            data: []
          },
          {
            label: 'F3',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx3.fill : 'transparent',
            borderColor: Colors.colx3.border,
            data: []
          },
          {
            label: 'FC5',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx4.fill : 'transparent',
            borderColor: Colors.colx4.border,
            data: []
          },
          {
            label: 'T7',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx5.fill : 'transparent',
            borderColor: Colors.colx5.border,
            data: []
          },
          {
            label: 'P7',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx6.fill : 'transparent',
            borderColor: Colors.colx6.border,
            data: []
          },
          {
            label: 'O1',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx7.fill : 'transparent',
            borderColor: Colors.colx7.border,
            data: []
          },
          {
            label: 'O2',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx8.fill : 'transparent',
            borderColor: Colors.colx8.border,
            data: []
          },
          {
            label: 'P8',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx9.fill : 'transparent',
            borderColor: Colors.colx9.border,
            data: []
          },
          {
            label: 'T8',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx10.fill : 'transparent',
            borderColor: Colors.colx10.border,
            data: []
          },
          {
            label: 'FC6',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx11.fill : 'transparent',
            borderColor: Colors.colx11.border,
            data: []
          },
          {
            label: 'F4',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx12.fill : 'transparent',
            borderColor: Colors.colx12.border,
            data: []
          },
          {
            label: 'F8',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx13.fill : 'transparent',
            borderColor: Colors.colx13.border,
            data: []
          },
          {
            label: 'AF4',
            lineTension: 0.5,
            fill: true,
            backgroundColor: (this.chartType == 'area-chart') ?  Colors.colx14.fill : 'transparent',
            borderColor: Colors.colx14.border,
            data: []
          }
        ]
      },
    });
  }

  getXaxisLabels(val) {
    let ret = [];
    for(let i=0;i<val;i++) {
      ret.push('');
    }
    return ret;
  }

  pinch(event) {
    console.log('pinch')
  }

  parentChangeHandler(event) {
    console.log('chaaaa')
  }

  handlePan(event) {
    //console.log(event.velocityX);
    this.emitPan.emit(event.velocityX);
  }


}
