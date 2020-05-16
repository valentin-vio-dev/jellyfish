import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  timeoutValue: string;

  constructor(private menu: MenuService, private recordService: RecordService) { }

  ngOnInit() {
    this.timeoutValue = this.recordService.getScanTimeout() / 1000 + ' seconds';
  }

  openNav() {
    this.menu.openNav();
  }

  timeoutChange(event) {
    console.log(event.detail.value)
    if(event.detail.value == 's-5') {
      this.timeoutValue = '5 seconds';
      this.recordService.setScanTimeoout(5);
    }else{
      this.timeoutValue = '10 seconds';
      this.recordService.setScanTimeoout(10);
    }
  }

}
