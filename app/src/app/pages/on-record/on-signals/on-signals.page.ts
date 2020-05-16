import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Colors } from '../../../utils/colors';

import { Chart } from 'chart.js';
import { RecordService } from 'src/app/services/record.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-on-signals',
  templateUrl: './on-signals.page.html',
  styleUrls: ['./on-signals.page.scss'],
})
export class OnSignalsPage implements OnInit, OnDestroy {
  signalsChart: Chart;
  refreshTimeOut: any;
  chartType: string = '';
  @ViewChild('canvasChart', {static: true}) canvasChart;

  constructor(private router: Router, private recordService: RecordService, private alertController: AlertController) { }

  ngOnInit() {
    this.constructSignalsChart();
    this.refreshChart();
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeOut);
  }

  refreshChart() {
    this.refreshTimeOut = setTimeout(() => {
      for(let i=0;i<14;i++) {
        this.signalsChart.data.datasets[i].data = this.recordService.getSignalsByChannel(i);
      }
      this.signalsChart.update();
      this.refreshChart();
    }, RecordService.REFRESH_RATE);
  }

  stop() {
    this.recordService.stopRecord();
    this.router.navigate(['connected']);
  }

  constructSignalsChart() {
    this.signalsChart = new Chart(this.canvasChart.nativeElement, {
      type: 'line',
      options: this.getChartOptions(),
      data: {
        labels: this.getXaxisLabels(),
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

  getChartOptions() {
    return {
      animation: false,
      responsive: true,
      maintainAspectRatio: false,
      elements: {
        point:{
          radius: 0
        }
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [{
          gridLines: {
            display: false,
          },
          ticks: {
              display: false,
              min: -100,
              max: 100,
              stepSize: 1
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

  getXaxisLabels() {
    let ret = [];
    for(let i=0;i<RecordService.DATA_MAX_LEN;i++) {
      ret.push('');
    }
    return ret;
  }

  generateRandoms(c) {
    let ret = [];
    for(let i=0;i<RecordService.DATA_MAX_LEN;i++) {
      ret.push(Math.random() * 1000 + c);
    }
    return ret;
  }

  async openAddEventDialog() {
    let alert = await this.alertController.create({
      header: 'Add new event',
      message: 'You can attach some event to a given section of the record. After you added just click on the signals when you want to stop it.',
      inputs: [
        {
          name: 'event-name',
          placeholder: 'Event',
          type: 'text'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add event',
          handler: data => {
            console.log(data)
          }
        }
      ]
    });
    await alert.present();
  }
  


}

