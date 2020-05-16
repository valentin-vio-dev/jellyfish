import { Record } from '../../models/Record';
import { SignalPacket } from 'src/models/SignalPacket';

export function snapshotToArray(snap: firebase.database.DataSnapshot) {
    let ret = [];
    snap.forEach(element => {
        let item = element.val();
        item.key = element.key;
        ret.push(item);
    });
    return ret;
}

export function snapshotToRecordArray(snap: firebase.database.DataSnapshot): Record[] {
    let ret: Record[] = [];
    snap.forEach(element => {
        let record: Record = new Record();
        let signals = objToSignalPacketArray(element.val().signals);
        //record.setFromObj(element.val(), element.key, signals);
        record.calculateLength();
        record.calculateSampleCount();

        console.log(record)

        ret.push(record);
    });
    return ret;
}

function objToSignalPacketArray(obj: any): SignalPacket[] {
    let ret: SignalPacket[] = [];
    Object.keys(obj).forEach((key) => {
        ret.push(new SignalPacket(obj[key].packet, obj[key].time));
    });
    return ret;
}

function objToArr(obj: any) {
    let ret = [];
    Object.keys(obj).forEach((key) => {
        ret.push(obj[key]);
    });
    return ret;
}