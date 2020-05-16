import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecordService } from 'src/app/services/record.service';
import { AlertController } from '@ionic/angular';
import { DeviceService } from 'src/app/services/device.service';
import { CloudService } from 'src/app/services/cloud.service';

@Component({
  selector: 'app-connected',
  templateUrl: './connected.page.html',
  styleUrls: ['./connected.page.scss'],
})
export class ConnectedPage implements OnInit {
  cloudSaveEnabled: boolean = false;
  maxLenDataOnScreen: number;
  signalsPerSeconds: number;
  recordName: string = '';
  recordNotes: string = '';
  isPrivate: boolean = false;

  constructor(private cloudService: CloudService, public alertController: AlertController, private router: Router, private recordService: RecordService, public deviceService: DeviceService) { }

  ngOnInit() {
    if(this.deviceService.connectedDevice == null) {
      this.router.navigate(['main/scan-tab']);
    }
  }

  disconnect() {
    this.cloudSaveEnabled = false;
    this.deviceService.disconnectDevice();
    this.router.navigate(['main/scan-tab']);
  }

  async missingFields() {
    const alert = await this.alertController.create({
      header: 'Missing settings',
      message: 'Please fill all required fields!',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async start() {
    if(this.maxLenDataOnScreen == undefined || this.signalsPerSeconds == undefined || (this.cloudSaveEnabled && this.recordName.trim() == '')) {
      this.missingFields();
      return;
    }

    RecordService.DATA_MAX_LEN = this.maxLenDataOnScreen;
    RecordService.REFRESH_RATE = 1000 / this.signalsPerSeconds;

    this.cloudService.setCloudSaveEnable(this.cloudSaveEnabled);

    if(this.cloudSaveEnabled) {
      await this.cloudService.prepareForRecord(
        this.recordName, this.recordNotes,
        this.deviceService.connectedDevice.name,
        this.deviceService.connectedDevice.address,
        this.isPrivate
      );
    }
    
    this.recordService.startRecord().then(() => {
      this.router.navigate(['on-record']);
    });
    
  }

}
