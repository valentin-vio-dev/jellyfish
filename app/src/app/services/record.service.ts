import { Injectable } from '@angular/core';
import { SignalPacket } from 'src/models/SignalPacket';
import { CloudService } from './cloud.service';

import { Plugins } from "@capacitor/core";
const { EEGPlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  static CHANNELS_COUNT: number;
  static DATA_MAX_LEN: number;
  static REFRESH_RATE: number;
  
  dataStreamListener: any;
  recordingTimeout: any;
  signalPackets: SignalPacket[] = [];

  constructor(private cloudService: CloudService) { }

  recording() {
    this.recordingTimeout = setTimeout(() => {
      this.addPacket(SignalPacket.generateRandomPacket());
      this.recording();
    }, RecordService.REFRESH_RATE);
  }

  startRecord() {
    this.subscribeToDataStream();
    //this.recording();
    return EEGPlugin.startRecord();
  }

  subscribeToDataStream() {
    this.dataStreamListener = EEGPlugin.addListener('dataStream', (res) => {
      let packet = new SignalPacket(res.packet, Date.now().toString());
      this.addPacket(packet);
    });
  }

  unsubscribeFromDataStream() {
    this.dataStreamListener.remove();
  }

  stopRecord() {
    if(this.cloudService.cloudSaveEnabled) {
      this.cloudService.endRecord();
    }
    this.signalPackets = [];
    this.unsubscribeFromDataStream();
    clearTimeout(this.recordingTimeout);
    return EEGPlugin.stopRecord();
  }

  addPacket(packet: SignalPacket) {
    this.signalPackets.push(packet);
    if(this.cloudService.cloudSaveEnabled) {
      this.cloudService.pushSignalPacketToCloud(packet);
    }
    
    if(this.signalPackets.length > RecordService.DATA_MAX_LEN) {
      this.signalPackets.shift();
    }
  }

  getSignalsByChannel(channel: number) {
    let channelDatas = [];
    this.signalPackets.forEach((packet: SignalPacket) => {
      let value = (parseFloat(packet.deconstructToSignals()[channel]));
      channelDatas.push(value);
    });
    //console.log(`channel ${channel}`, channelDatas);
    return this.baselineCorrection(channel, channelDatas);
  }
  
  baselineCorrection(channel: number, channelDatas: number[]) {
    let avg = 0;
    let copyData = channelDatas.slice();
    copyData.forEach(data => {
      avg += data;
    });

    avg /= copyData.length;

    for(let i=0;i<copyData.length;i++) {
      copyData[i] = copyData[i] - avg;
    }
    return copyData;
  }

  getScanTimeout() {
    if(localStorage.getItem('scan-timeout')) {
      return parseInt(localStorage.getItem('scan-timeout')) * 1000;
    }else{
      return 5000;
    }
  }

  setScanTimeoout(time: number) {
    localStorage.setItem('scan-timeout', time.toString());
  }

}
