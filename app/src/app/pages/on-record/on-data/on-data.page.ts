import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-on-data',
  templateUrl: './on-data.page.html',
  styleUrls: ['./on-data.page.scss'],
})
export class OnDataPage implements OnInit {
  indexes: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];

  constructor(private router: Router, public recordService: RecordService) { }

  ngOnInit() {
  }

  doReorder(ev: any) {
    ev.detail.complete();
  }

  stop() {
    this.recordService.stopRecord();
    this.router.navigate(['connected']);
  }
}
