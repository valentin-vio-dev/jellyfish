import { Component, OnInit } from '@angular/core';
import { Device } from 'src/models/Device';
import { Router } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { MenuService } from 'src/app/services/menu.service';
import { AlertController } from '@ionic/angular';
import { RecordService } from 'src/app/services/record.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  loading: boolean = false;

  constructor(private recordService: RecordService, private router: Router, public deviceService: DeviceService, private menu: MenuService, private alertController: AlertController ) { }

  ngOnInit() {
  }

  connect(device: Device) {
    this.deviceService.connectDevice(device).then(() => {
      this.deviceService.connectedDevice = device;
      this.router.navigate(['connected']);
    }).catch((err) => {
      this.connectErrorMessage();
    });
    
  }

  refresh(event) {
    let scanTime = this.recordService.getScanTimeout();
    console.log('Scanning...');
    this.deviceService.scanning = true;
    this.deviceService.scanDevices(scanTime);
    setTimeout(() => {
      console.log('Stop scan...');
      this.deviceService.scanning = false;
      this.deviceService.stopScan();
      event.target.complete();
    }, scanTime);
  }

  openNav() {
    this.menu.openNav();
  }

  async connectErrorMessage() {
    const alert = await this.alertController.create({
      header: 'Oops...',
      message: 'Can\'t connect to device!',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
