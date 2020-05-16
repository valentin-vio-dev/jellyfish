import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';

import { BrainSignal } from '../../../brain-on/BrainSignal';

@Component({
  selector: 'app-on-media',
  templateUrl: './on-media.page.html',
  styleUrls: ['./on-media.page.scss'],
})
export class OnMediaPage implements OnInit {
  brain: BrainSignal;
  size: number = 200;

  constructor(private router: Router, public recordService: RecordService) { }

  ngOnInit() {
    let element = document.getElementById('brain');
    this.brain = new BrainSignal(element);
    addEventListener('resize', () => {
      let size = window.innerWidth;
      this.size = size;
      this.brain.updateSize(size);
    });

    let size = window.innerWidth;
    this.size = size;
    this.brain.updateSize(window.innerWidth);

    this.addData();
  }

  addData() {
    setTimeout(() => {
        this.brain.updateSensors([
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
            (Math.random() * 300 + 4000).toFixed(2),
        ]);
        this.addData();
    }, 100);

}


  stop() {
    this.recordService.stopRecord();
    this.router.navigate(['connected']);
  }

}
