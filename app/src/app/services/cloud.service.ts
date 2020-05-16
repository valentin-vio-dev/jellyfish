import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../environments/firebase';
import { snapshotToArray, snapshotToRecordArray } from '../utils/utils';
import { Record } from 'src/models/Record';
import { SignalPacket } from 'src/models/SignalPacket';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  database: firebase.database.Database;
  records: Record[] = [];
  loadingRecords: boolean = false;
  currentCloudRecord: Record;
  preparedRecordId: string;
  fetchComplete: EventEmitter<any> = new EventEmitter();

  cloudSaveEnabled: boolean = false;

  constructor(private authService: AuthService) {
    this.database = firebase.database();
  }

  getRecordsByUserId(uid: string) {
    let userRef = firebase.database().app.firestore().collection('users').doc(uid);
    return firebase.database().app.firestore().collection('records').where('uid', '==', userRef);
  }

  async fetchRecords() {
    this.loadingRecords = true;
    this.records = [];
    console.log('fetch')
    let snapshot: any = await firebase.database().app.firestore().collection('records').get();
    snapshot.docs.forEach(async doc => {
      let data = doc.data();
      let user;
      await data.uid.get().then(doc => {
        if(doc.exists) {
          user = doc.data();
          user['uid'] = doc.id;
        }
      });
      
      let signals: SignalPacket[] = [];
      let id = doc.id

      data.records.forEach(rec => {
        signals.push(new SignalPacket(rec.signals, rec.time));
      });

      let rec = new Record();
      rec.setFromObj(data, id, signals, user);
      rec.calculateLength();
      rec.calculateSampleCount();

      if(user) {
        this.records.push(rec);
      }
    });
    this.loadingRecords = false;
    this.fetchComplete.emit(null);
  }

  setCurrentCloudRecod(id: string) {
    let current = this.records.filter((record) => {
      return record.id === id;
    })[0];
    this.currentCloudRecord = current;
  }

  deleteRecord(record: Record): Promise<any> {
    return firebase.database().app.firestore().collection('records').doc(record.id).delete();
  }

  prepareForRecord(recordName: string, recordNotes: string, deviceName: string, deviceAddress: string, isPrivate: boolean) {
    return firebase.database().app.firestore().collection('records').add({
      uid: firebase.database().app.firestore().doc(`/users/${this.authService.authUser.uid}`),
      name: recordName,
      notes: recordNotes,
      deviceName: deviceName,
      deviceAddress: deviceAddress,
      dateStart: Date.now(),
      dateEnd: '- recording -',
      isPrivate: isPrivate,
      records: []
    }).then(ref => {
      let newId = ref.id;
      this.preparedRecordId = newId;
    });
  }

  endRecord() {
    firebase.database().app.firestore().collection('records').doc(this.preparedRecordId).update({
      dateEnd: Date.now()
    });
  }

  pushSignalPacketToCloud(packet: SignalPacket) {
    firebase.database().app.firestore().collection('records').doc(this.preparedRecordId).update({
      records: firebase.firestore.FieldValue.arrayUnion({
        signals: packet.packet,
        time: packet.time
      })
    });
  }

  setCloudSaveEnable(enable: boolean) {
    this.cloudSaveEnabled = enable;
  }

  getSignalsByChannel(channel: number) {
    let channelDatas = [];
    this.currentCloudRecord.signals.forEach((packet: SignalPacket) => {
      let value = parseFloat(packet.deconstructToSignals()[channel]) + (channel * 1000) + 100;
      channelDatas.push(value);
    });
    //console.log(`channel ${channel}`, channelDatas);
    return channelDatas;
  }

  setRecordReadPermission(record: Record, value: boolean) {
    return firebase.database().app.firestore().collection('records').doc(record.id).update({
      isPrivate: value
    });
  }
}
