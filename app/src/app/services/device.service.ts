import { Injectable } from '@angular/core';
import { Device } from 'src/models/Device';

import { Plugins } from "@capacitor/core";
import { Record } from 'src/models/Record';
const { EEGPlugin } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  scannedDevices: Device[] = [
    new Device('EPOC+ (A53VAR)', 'M4:X2:K7:B5', 50),
    new Device('EPOC+ (K130XS)', 'K5:L4:X3:C1', 50, Device.CONNECTED)
  ];
  scanning: boolean = false;
  connectedDevice: Device = null;
  scanListener: any;

  constructor() { }

  scanDevices(time) {
    this.scannedDevices = [];

    EEGPlugin.scanStart({time: time}).then(() => {
      this.scanListener = EEGPlugin.addListener("scanResult", (res) => {
        let device = new Device(res.name, res.address);
        this.scannedDevices.push(device);
      });  
    });
  }

  stopScan() {
    this.scanListener.remove();
    EEGPlugin.scanStop();
  }

  connectDevice(device: Device): Promise<any> {
    return EEGPlugin.connect({device: device.name});
  }

  disconnectDevice() {
    this.connectedDevice = null;
  }

  exportFile(record, from, to): Promise<any> {
    return EEGPlugin.exportFile({data: this.prepareForExport(record, from, to)});
  }

  prepareForExport(record: Record, from: number, to: number) {
    let ret = "";
    ret += "RECORD_NAME=" + record.name + ";";
    ret += "NOTES=" + record.notes + ";";
    ret += "SAMPLE_COUNT=" + record.sampleCount + ";";
    ret += "LENGTH=" + record.length;
    return ret;
  }
}
