import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { CloudService } from 'src/app/services/cloud.service';
import { Record } from 'src/models/Record';
import { AlertController, PickerController, ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { DeviceService } from 'src/app/services/device.service';

@Component({
  selector: 'app-record-view',
  templateUrl: './record-view.page.html',
  styleUrls: ['./record-view.page.scss'],
})
export class RecordViewPage implements OnInit {
  privateRecord: boolean = false;
  currentSegment: string = 'info';
  chartType: string = 'area-chart';
  isInLib: boolean = false;
  clickedToLibButton: boolean = false;
  times: {lower: number, upper: number} = {lower: 0, upper: 10};
  timesText: {lower: string, upper: string} = {lower: '00:00:00', upper: '00:00:10'};
  time: {min: number, max: number} = {min: 0, max: 100};

  emitTimeChange: EventEmitter<null> = new EventEmitter();

  constructor(private deviceService: DeviceService, private toastController: ToastController, private pickerController: PickerController, private userService: UserService, private router: Router, public cloudService: CloudService, public alertController: AlertController, public authService: AuthService) { }

  ngOnInit() {
    this.times = {lower: 0, upper: 10};
    this.time.max = this.cloudService.currentCloudRecord.sampleCount;
    this.privateRecord = this.cloudService.currentCloudRecord.isPrivate;
    this.timesText = {
      lower: this.formatTime(this.times.lower),
      upper: this.formatTime(this.times.upper)
    };

    

    if(!this.cloudService.currentCloudRecord) {
      this.router.navigate(['main/cloud-tab']);
    }

    if(this.authService.authUser && this.authService.authUser.libs) {
      for(let i=0;i<this.authService.authUser.libs.length;i++) {
        if(this.authService.authUser.libs[i].recId == this.cloudService.currentCloudRecord.id) {
          this.isInLib = true;
          break;
        }else{
          this.isInLib = false;
        }
      }
    }

    this.authService.authChanged.subscribe(() => {
      if(this.authService.authUser && this.authService.authUser.libs) {
        for(let i=0;i<this.authService.authUser.libs.length;i++) {
          if(this.authService.authUser.libs[i].recId == this.cloudService.currentCloudRecord.id) {
            this.isInLib = true;
            break;
          }else{
            this.isInLib = false;
          }
        }
      }
    });
    
    
  }

  back() {
    this.router.navigate(['main/cloud-tab']);
  }

  segmentChanged(event) {
    this.currentSegment = event.detail.value;
  }

  goToUser(uid) {
    this.router.navigate([`user/${uid}/record-view`])
  }

  addToLib() {
    this.clickedToLibButton = true;
    this.userService.addRecToLibrary(this.authService.authUser.uid, this.cloudService.currentCloudRecord.id).then(() => {
      this.authService.setAuthUser(this.authService.authUser.uid);
      this.isInLib = true;
      this.clickedToLibButton = false;
    });
  }

  removeFromLib() {
    this.clickedToLibButton = true;
    this.userService.removeRecFromLibrary(this.authService.authUser, this.cloudService.currentCloudRecord.id).then(() => {
      this.authService.setAuthUser(this.authService.authUser.uid);
      this.isInLib = false;
      this.clickedToLibButton = false;
    });
  }

  async openLowerPicker() {
    const picker = await this.pickerController.create({
      columns: this.getTimePickerColumns(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            //console.log('got', value);
            this.setInputValues(value, 'lower');
          }
        }
      ]
    });

    await picker.present();
  }

  async openUpperPicker() {
    const picker = await this.pickerController.create({
      columns: this.getTimePickerColumns(),
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log('got', value);
            this.setInputValues(value, 'upper');
          }
        }
      ]
    });

    await picker.present();
  }

  getTimePickerColumns() {
    let columns = [];
    columns.push({
      name: `col-hh`,
      options: this.getColumnOptions('HOUR')
    });

    columns.push({
      name: `col-mm`,
      options: this.getColumnOptions('MIN')
    });

    columns.push({
      name: `col-ss`,
      options: this.getColumnOptions('SEC')
    });
    return columns;
  }

  getColumnOptions(header) {
    let options = [];

    for (let i = 0; i < 60; i++) {
      options.push({
        text: (i < 10) ? '0'+i : i,
        value: i
      });
    }
    return options;
  }

  setInputValues(res, input) {
    let text = `${res['col-hh'].text}:${res['col-mm'].text}:${res['col-ss'].text}`;
    

    let seconds = (res['col-ss'].value) + (res['col-mm'].value * 60) + (res['col-hh'].value * 60 * 60);
    let sampCountFromTime = Record.getSampleCpuntFromTime(this.cloudService.currentCloudRecord, seconds)
    if(input == 'upper') {
      this.times = {
        lower: this.times.lower,
        upper: sampCountFromTime
      };
    }else{
      this.times = {
        lower: sampCountFromTime,
        upper: this.times.upper
      };
    }
    this.emitTimeChange.emit(null);

    if(this.times.lower == this.times.upper) {
      this.times['upper'] = this.times.upper + 5;
    }

    this.timesText[input] = this.formatTime(sampCountFromTime);
    //console.log('from-picker', this.times);
  }

  formatTime(seconds: number) {
    let seccc = Record.getElapsedTime(this.cloudService.currentCloudRecord, seconds);
    let h = Math.floor(Math.abs(seccc / 60 / 60));
    let m = Math.floor(Math.abs(seccc / 60 % 60));
    let s = Math.floor(Math.abs(seccc % 60));
    let res = '';
    res += (h < 10 ? '0'+h+':' : h+':');
    res += (m < 10 ? '0'+m+':' : m+':');
    res += (s < 10 ? '0'+s : s);
    return res;
  }

  panRange() {
    let range: any = document.getElementById('range');
    let times = JSON.parse(range.children[0].value);
    this.times = times;
    this.timesText['lower'] = this.formatTime(this.times.lower);
    this.timesText['upper'] = this.formatTime(this.times.upper);
    this.emitTimeChange.emit(null);
  }

  setRecordRead(ev?) {
    this.cloudService.setRecordReadPermission(this.cloudService.currentCloudRecord, this.privateRecord).then(() => {
      this.readStateChange();
      this.cloudService.fetchRecords();
    });
  }

  async readStateChange() {
    const toast = await this.toastController.create({
      message: 'Record state changed!',
      duration: 2000
    });
    toast.present();
  }

  handleChildPan(event) {
    this.times = {
      lower: (this.times.lower - event/2) > 0 ? this.times.lower - event/2 : 0,
      upper: (this.times.upper - event/2) < this.time.max ? this.times.upper - event/2 : this.time.max
    };

    if(Math.abs(this.times.upper - this.times.lower) < 10 && this.times.lower == 0) {
      this.times.upper = 10;
    }

    if(Math.abs(this.times.upper - this.times.lower) < 10 && this.times.upper == this.time.max) {
      this.times.lower = this.time.max - 11;
    }

    this.timesText['lower'] = this.formatTime(Math.floor(this.times.lower));
    this.timesText['upper'] = this.formatTime(Math.floor(this.times.upper));
    

    
    //console.log(this.times)
  }

  export() {
    this.deviceService.exportFile(this.cloudService.currentCloudRecord, 0, 0).then((res) => {
      console.log('RESSS')
      console.log(res)
    });
  }
}
